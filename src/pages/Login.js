import React from "react";
import wave from "./wave.png";
import avatar from "./avatar.svg";
import bg from "./bg.svg";
import "../components/Login.css";

function Login() {
  return (
    <div>
      <head>
        <title>Health Tracker Login Form</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins:600&display=swap"
          rel="stylesheet"
        />
        <script src="https://kit.fontawesome.com/a81368914c.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <img className="wave" src={wave} />
        <div className="container">
          <div className="img">
            <img src={bg} />
          </div>
          <div className="login-content">
            <form action="index.html">
              <img src={avatar} />
              <h2 className="title">Welcome</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Username</h5>
                  <input type="text" class="input" />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>Password</h5>
                  <input type="password" className="input" />
                </div>
              </div>
              <a href="/home">Forgot Password?</a>
              <input type="submit" className="btns" value="Login" />
              <p>
                Don't have an account?<a href="/home ">Sign Up</a>{" "}
              </p>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
