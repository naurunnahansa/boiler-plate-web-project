import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';



const Login = () => {
  let authContext = useContext(AuthContext)
  let loginUser = authContext.contextData.loginUser
  
  return (
    <div onSubmit={loginUser} className='centerDiv'>
      <form style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"25em",  boxShadow: "rgba(100, 100, 111, 0.2) 0px 3px 8px " , padding:"2em", borderRadius:"1em", marginTop:"1em"}}>
        <h3 style={{ margin:'0', fontFamily:'Playfair Display'}} >Login</h3>

        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="email">Email</label>
        <input style={{ }} type="text" name='email' placeholder="Email"></input>
        
        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="password">Password</label>
        <input style={{ }} type="password" name='password' placeholder="Password"></input>

        <button className="button-38" role="button" style={{marginTop:"1em" }}>Login</button>
      </form>
    </div>
  );
}

export default Login