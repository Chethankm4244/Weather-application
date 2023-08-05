import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <>
      <div className="l-container">
        <div className="login-container">
          <img
            src="../images/background.png"
            alt=""
            className="background-img"
          />
          <form className="login-form">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="Enter the Email" />
            <label htmlFor="">Password</label>
            <input type="Password" placeholder="Enter the Password" />
            <p>Forgot Password?</p>
            <div className="btns">
              <button className="login-btn">Login</button>
              <button className="signup-btn">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
