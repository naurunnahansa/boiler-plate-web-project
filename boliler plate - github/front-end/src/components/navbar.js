import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';


function NavBar(){
    let authContext = useContext(AuthContext)
    let logoutUser = authContext.contextData.logoutUser
    let username = undefined
    if(authContext.contextData.user!=null){
        username = authContext.contextData.user.username
    }
     


  return (
    <div style={{border:"1px solid #D1D1D1" , borderTopStyle: "None", borderRightStyle:"None", borderLeftStyle:"None"}}>
      <header className='navbar' style={{ margin:'0.3rem 0rem'}}>

        <Link to="/" style={{ paddingLeft:'3.5rem'}} className=' navbar__title '>Example</Link>

        <span style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
          <Link to="/about" className='navbar__item'>About</Link>
        </span>
        {!username?
        <><Link to="/register" className='navbar__item'>Sign up</Link>
        <Link to="/login" className='navbar__item'>Login</Link></>:
        <Link onClick={logoutUser} to="/" className='navbar__item'>Logout</Link>
        }
        <h3 style={{ padding: '0rem 2rem' }}>Hi, {username?username:"User"}</h3>
    </header>
  </div>
  )
}

export default NavBar
