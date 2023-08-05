import React from "react";
import './SignupPage.css'
import { Outlet } from "react-router-dom";
const SignupPage = () => {
  return (
    <div className="s-container">
      <div className="signup-container">
        <img src="../images/background.png" alt="" className="background-img" />
        <div className="signup-form">
          <label htmlFor="">User Name</label>
          <input type="text" placeholder="Enter your Name" />
          <label htmlFor="">Phone Number</label>
          <input type="number" placeholder="Enter your Phone Number" />

          <label htmlFor="">Email</label>
          <input type="email" placeholder="Enter the Email" />
          <label htmlFor="">Password</label>
          <input type="Password" placeholder="Enter the New Password" />
          <label htmlFor="">Re-Enter Password</label>
          <input type="Password" placeholder="Enter the Password Again" />
          <p>If you already have an account please login</p>
          <div className="btns">
            <button className="login-btn">Create-account</button>
            <button className="signup-btn">Login</button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default SignupPage;
