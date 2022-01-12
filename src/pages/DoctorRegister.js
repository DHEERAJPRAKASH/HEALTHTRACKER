import React, { useContext, useState } from "react";
import avatar from "./avatar.svg";
import "../components/DoctorRegister.css";
import DoctorContext from "../context/Doctors/DoctorContext";
// import DoctorState from "../context/Doctors/DoctorState"

const DoctorRegister = () => {
  const context = useContext(DoctorContext);
  const { addDoctor } = context;

  const [docReg, setdocReg] = useState({experience:"",designation:"",working:""})
  const handleClick = (e) => {
      e.preventDefault();
      addDoctor(docReg.experience,docReg.designation,docReg.working);
      
  };
  const onChange = (e) => {
    setdocReg({...docReg,[e.target.name]: e.target.value})
  };
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
        <div className="container" style={{ padding: "2rem 30rem 2rem" }}>
          <div className="register-content">
            <form action="index.html">
              <img src={avatar} />
              <h2 className="title">REGISTRATION</h2>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-dumbbell" style={{fontSize:"25px",color:"blue"}}></i>
                </div>
                <div className="div">
                  <input type="text" className="input" id="experience" name="experience" onChange={onChange} placeholder="Experience" />
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-briefcase" style={{fontSize:"25px",color:"violet"}}></i>
                </div>
                <div className="div">
                  <input type="text" className="desig"  id="designation" name="designation" onChange={onChange} placeholder="Designation"/>
                </div>
              </div>
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-building" style={{fontSize:"25px",color:"cyan"}}></i>
                </div>
                <div className="div">
                  <input type="text" className="input" id="working" name="working" onChange={onChange} placeholder="Working"/>
                </div>
              </div>

              <input
                type="submit"
                className="btns"
                value="Register"
                onClick={handleClick}
              />
            </form>
          </div>
        </div>
      </body>
    </div>
  );
};

export default DoctorRegister;
