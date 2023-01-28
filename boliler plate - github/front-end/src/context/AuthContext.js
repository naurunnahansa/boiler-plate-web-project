import {createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import {useNavigate} from "react-router-dom";
const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    let API = "http://localhost:3002"; 

    
    let [username,setUser] = useState(()=> localStorage.getItem('authTokens') ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).accessToken):null)
    let [authTokens,setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
    let [loading,setLoading] = useState(true)
    const navigate = useNavigate();

    let loginUser = async (e )=>{
        e.preventDefault();
        console.log('Event: Login Form Submit');
        loginUserMeth({username:e.target.email.value, password:e.target.password.value})
    }
    let loginUserMeth = async (userData )=>{
        let response = await fetch(API+'/api/auth/token', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':userData.username, 'password':userData.password})
        })
        let data = await response.json()
        if(response.status == 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.accessToken))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/',{replace:true})
        }else{
            alert('somthing went wrong, try again later')
        }
    }
    let registerUser = async (e )=>{
        e.preventDefault();
        console.log('Event: Form Submit');
        console.log(JSON.stringify({
            'username':e.target.username.value, 
            'password':e.target.password01.value,
            'password2':e.target.password02.value,
            'email':e.target.email.value
        }))
        let response = await fetch(API+'/api/auth/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'username':e.target.username.value, 
                'password':e.target.password01.value,
                'password2':e.target.password02.value,
                'email':e.target.email.value
            })
        })
        if(response.status == 201){
            loginUserMeth({username:e.target.email.value, password:e.target.password01.value})
        }else{
            alert('somthing went wrong, try again later')
        }
    }

    let updateToken = async ( )=>{
        let response = await fetch(API+'/api/auth/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refreshToken':authTokens.refreshToken})
        })
        if(response.status == 200){
            let data = await response.json()
            setAuthTokens(data)
            setUser(jwtDecode(data.accessToken))
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log("updated =>")
        }else{
            console.log("logout =>")
            await logoutUser()
        }
    }
    let logoutUser = async (e )=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let contextData = {
        user:username,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        registerUser:registerUser
    }

    useEffect(()=>{
        let interval = setInterval(()=>{
            console.log("Use Effect:", authTokens)
            if(authTokens != undefined){
                updateToken()
            }
        },10*60*1000)
        return ()=> clearInterval(interval)
    }, [authTokens,loading])

    return(
        <AuthContext.Provider value={{contextData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;