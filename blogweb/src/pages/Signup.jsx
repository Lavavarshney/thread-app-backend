import React, { useState } from 'react';
import { ID } from 'appwrite';

import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const id = ID.unique();
  const [userData, setUserData] = useState({ id: "", name: "", email: "", password: "" });
  const navigate = useNavigate();

  const signupFunc = async () => {
    // APPWRITE CONFIGURATION
    const signUpProcess = account.create(
      id,
      userData.email,
      userData.password,
      userData.name,
    )
    signUpProcess.then(function (response) {
      alert("SignUp successfully");
      
      navigate('./login'); // Pass userData 
      console.log({ userData })
    }, function (error) {
      alert(error);
    })
  }

  return (
    <div className="full-page-signup">
      <div className="signup-form">
        <h2 className="form-title">Create an Account</h2>
        <form>
          <label className="form-label" htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder='Name' onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="form-input" />
          
          <label className="form-label" htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder='Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="form-input" />
          
          <label className="form-label" htmlFor="password">Password:</label>
          <input type="password" id="password" placeholder='Password' onChange={(e) => setUserData({ ...userData, password: e.target.value })} className="form-input" />
          
          <button onClick={signupFunc} className="form-btn">Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;