import React, { useContext, useState } from "react";
import avatar from "./avatar.svg";
import "../components/DoctorRegister.css";
import DocUserContext from "../context/DocUserContext";

const DoctorRegister = () => {
  const context = useContext(DocUserContext);
  const { addDoctor } = context;

  const [docReg, setdocReg] = useState({
    experience: "",
    designation: "",
    working: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addDoctor(docReg.experience, docReg.designation, docReg.working);
    console.log(docReg.experience);
  };
  const onChange = (e) => {
    setdocReg({ ...docReg, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container" style={{ padding: "2rem 30rem 2rem"}}>
        <div className="register-content">
          <form action="index.html">
            <img src={avatar} alt="hai" />
            <h2 className="title">REGISTRATION</h2>
            <div className="input-div one">
              <div className="i">
                <i
                  className="fas fa-dumbbell"
                  style={{ fontSize: "25px", color: "blue" }}
                ></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="input"
                  id="experience"
                  name="experience"
                  onChange={onChange}
                  placeholder="Experience"
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i
                  className="fas fa-briefcase"
                  style={{ fontSize: "25px", color: "violet" }}
                ></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="desig"
                  id="designation"
                  name="designation"
                  onChange={onChange}
                  placeholder="Designation"
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i
                  className="fas fa-building"
                  style={{ fontSize: "25px", color: "cyan" }}
                ></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="input"
                  id="working"
                  name="working"
                  onChange={onChange}
                  placeholder="Working"
                />
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
    </div>
  );
};

export default DoctorRegister;
