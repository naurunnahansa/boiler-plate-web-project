import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext';

const Register = () => {
  let context = useContext(AuthContext)
  let registerUser = context.contextData.registerUser
  
  return (
    <div className='centerDiv'>

      <form onSubmit={registerUser} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", width:"25em", boxShadow: "rgba(100, 100, 111, 0.2) 0px 3px 8px ", padding:"2em", borderRadius:"1em", marginTop:"1em"}}>
        <h3 style={{ margin:'0', fontFamily:'Playfair Display'}} >Sign Up</h3>

        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="username">Username</label>
        <input style={{ }} type="text" name='username' placeholder="username"></input>
        
        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="email">Email</label>
        <input style={{ }} type="text" name='email' placeholder="Email"></input>
        
        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="password01">Password</label>
        <input style={{ }} type="password" name='password01' placeholder="Password"></input>
        
        <label style={{ margin:'1em 0 0.5em 0'}} htmlFor="password02">Confirm Password</label>
        <input style={{ }} type="password" name='password02' placeholder="Confirm Password"></input>

        <button className="button-38" role="button" style={{marginTop:"1em" }}>Submit</button>
      </form>
      
    </div>
  );
}

export default Register