import React,{useState} from "react";
import "../components/Signup.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Signup() {


  const [credentials, setCredentials] = useState({ name:"", email: "", password: "" ,repassword:""});

  const [DropValue, setDropValue] = useState("");
  let history = useHistory();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const dropSelect = (e) => {
    console.log(e);
    setDropValue(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("name:" + credentials.name);
    console.log("email:" + credentials.email);
    console.log("password:" + credentials.password);

    console.log("Drop Value is:" + DropValue);
    if (DropValue == "User") {
      console.log("i am User");

      let url = "http://localhost:5000/api/auth/createuser";
      let options = {
        method: "POST",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: credentials.name,
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

      let url = "http://localhost:5000/api/auth/createdoctor";
      let options = {
        method: "POST",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: credentials.name,
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

  

  return (
    <div>
      <body>
        <div className="background">
          <div id="login-box">
            <div class="left">
              <h1>Sign up</h1>

              <DropdownButton
                
                id="dropdown-item-button"
                title="Choose Your Cader"
                onSelect={dropSelect}
              >
                <Dropdown.Item eventKey="User">User</Dropdown.Item>
                <Dropdown.Item eventKey="Doctor">Doctor</Dropdown.Item>
              </DropdownButton>
              <br></br>
              <input
                type="text"
                className="text"
                name="name"
                placeholder="Username"
                onChange={onChange}
              />
              <input
                type="text"
                className="text"
                name="email"
                placeholder="E-mail"
                onChange={onChange}

              />
              <input
                type="password"
                className="password"
                name="password"
                placeholder="Password"
                onChange={onChange}

              />
              <input
                type="password"
                className="password"
                name="password2"
                placeholder="Retype password"
                onChange={onChange}

              />

              <input
                type="submit"
                className="submit"
                name="signup_submit"
                value="Sign me up"
                onClick={handleSubmit}
              />
            </div>

            <div className="right"></div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Signup;
