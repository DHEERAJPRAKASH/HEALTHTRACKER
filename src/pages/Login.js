import React, { useState } from "react";
import wave from "./wave.png";
import avatar from "./avatar.svg";
import bg from "./bg.svg";
import "../components/Login.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [DropValue, setDropValue] = useState("");
  let history = useHistory();

  const dropSelect = (e) => {
    console.log(e);
    setDropValue(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email:" + credentials.email);
    console.log("password:" + credentials.password);

    console.log("Drop Value is:" + DropValue);
    if (DropValue == "User") {
      console.log("i am User");

      let url = "http://localhost:5000/api/auth/login";
      let options = {
        method: "POST",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      let responseNotOK =
        response &&
        response.status === 400 &&
        response.statusText === "Bad Request";
      if (responseOK) {
        let data = await response.data;
        console.log("data is :" + data.authtoken);
        localStorage.setItem("token", data.authtoken);
        history.push("/");
      }
      if (responseNotOK) {
        alert("Invalid credentials");
      }
    } else if (DropValue == "Doctor") {
      console.log("I am a doctor");

      let url = "http://localhost:5000/api/auth/logindoctor";
      let options = {
        method: "POST",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      let responseNotOK =
        response &&
        response.status === 400 &&
        response.statusText === "Bad Request";
      if (responseOK) {
        let data = await response.data;
        console.log("data is :" + data.authtoken);
        localStorage.setItem("token", data.authtoken);
        history.push("/");
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      
      <body>
        <img className="wave" src={wave} alt="hai" />
        <div className="container">
          <div className="img">
            <img src={bg} alt="hai" />
          </div>

          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <img src={avatar} alt="hai" />
              <DropdownButton
                
                id="dropdown-item-button"
                title="Choose Your Cader"
                onSelect={dropSelect}
              >
                <Dropdown.Item eventKey="User">User</Dropdown.Item>
                <Dropdown.Item eventKey="Doctor">Doctor</Dropdown.Item>
              </DropdownButton>
              <h2 className="title">Welcome</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    type="email"
                    className="form-control"
                    value={credentials.email}
                    onChange={onChange}
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="UserName"
                  />
                </div>
              </div>
              <div className="input-div pass">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <input
                    type="password"
                    className="form-control"
                    value={credentials.password}
                    onChange={onChange}
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <input type="submit" className="btns" value="Login" />
              <p>
                Don't have an account?<a href="/signup">Sign Up</a>{" "}
              </p>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Login;
