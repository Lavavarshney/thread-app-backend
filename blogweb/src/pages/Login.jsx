import React, { useState } from 'react';

import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  //const [error, setError] = useState(""); // State to manage errors

  
  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    alert("loggined in");
    //window.location.replace("/"); // you can use different redirect method for your application
  }
   
  

  return (
    <div id="login-main">
      <div id="login-form">
        <h2 id="login-h2">Login</h2>
        
        <input 
          type="email" 
          id="login-input" 
          placeholder='Email' 
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input 
          type="password"  
          id="login-input" 
          placeholder='Password' 
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={() => login(user.email, user.password)} id="login-btn">Login</button>
      </div>
    </div>
  );
};

export default Login;
