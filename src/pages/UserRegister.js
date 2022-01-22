import React, { useContext, useState, useEffect } from "react";
import avatar from "./avatar.svg";
import "../components/DoctorRegister.css";
import DocUserContext from "../context/DocUserContext";
import { Form, FloatingLabel } from "react-bootstrap";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";
import "../components/UserRegister.css";
import axios from "axios";
const UserRegister = () => {
  const context = useContext(DocUserContext);

  const { getDoctor, addUser } = context;
  const userInitial = [];
  const [user, setuser] = useState(userInitial);

  const checkbox1 = useCheckboxState();
  const checkbox2 = useCheckboxState();
  const checkbox3 = useCheckboxState();
  const checkbox4 = useCheckboxState();
  const checkbox5 = useCheckboxState();

  const [userReg, setuserReg] = useState({
    worknature: "",
    othercomments: "",
    list_of_drug_allergies: "",
    other_illnesses: "",
    list_of_operations: "",
    list_of_current_medications: "",
  });
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [file,setfile]=useState(null)
  // let heavy;
  const handleChange = (e) => {
    // heavy = e.target.files[0];
    // console.log("updated image");
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0].name,
      });
      
    }
  };

  
 
  const handleClick = (e) => {
    e.preventDefault();
    // let path = image.raw;
    // let path = (image.raw).toString();
    let path = file.name;
    
    console.log(path + " is path");

    const formData = new FormData();
    formData.append("worknature", userReg.worknature);
    formData.append("exercisedaily", checkbox1.state);
    formData.append("eatingdiet", checkbox2.state);
    formData.append("alcoholconsumption", checkbox3.state);
    formData.append("caffeineconsumption", checkbox4.state);
    formData.append("smoking", checkbox5.state);
    formData.append("othercomments", userReg.othercomments);
    formData.append("list_of_drug_allergies", userReg.list_of_drug_allergies);
    formData.append("other_illnesses", userReg.other_illnesses);
    formData.append("list_of_operations", userReg.list_of_operations);
    formData.append("list_of_current_medications",userReg.list_of_current_medications);
    formData.append("userImage", file);
    
    console.log("file"+file)
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    //Add User
    console.log("file path: " +path);

    let url = "http://localhost:5000/api/userdetails/adduser";
    let options = {
      method: "POST",
      url: url,
      headers: {
        // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiODNkMTQ1NzNiYzg0Y2FjMWE2N2I0In0sImlhdCI6MTY0MTgyMTI4M30.KQnknF95JTsFUcRxPKL68kc0duDK-NfC1kcr3aDyMVY",
      },
      data: formData ,
    };
    let response = axios(options);

    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      let data = response.data;
      console.log("success");
      alert("success");
      setuser(user.concat(data));
    }
    

    // addUser();
  };

  const onChange = (e) => {
    setuserReg({ ...userReg, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container" style={{ padding: "2rem 30rem 2rem" }}>
        <div className="register-content">
          <form >
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
                    id="Worknature"
                    name="worknature"
                    value={userReg.worknature}
                    onChange={onChange}
                    placeholder="Worknature"
                  />
                </div>
              </div>
              <div className="input-div one checkboxx">
                <Form>
                  <div className="i">
                    <i
                      className="fas fa-briefcase"
                      style={{ fontSize: "25px", color: "violet" }}
                    ></i>
                  </div>
                  <label>Exercisedaily</label>
                  <Checkbox {...checkbox1}>
                    Checked: {checkbox1.state + ""}
                  </Checkbox>
                </Form>
              </div>

              <div className="input-div one checkboxx">
                <Form>
                  <div className="i">
                    <i
                      className="fas fa-briefcase"
                      style={{ fontSize: "25px", color: "violet" }}
                    ></i>
                  </div>
                  <label>Eating Diet</label>
                  <Checkbox {...checkbox2}>
                    Checked: {checkbox2.state + ""}
                  </Checkbox>
                </Form>
              </div>

              <div className="input-div one checkboxx">
                <Form>
                  <div className="i">
                    <i
                      className="fas fa-briefcase"
                      style={{ fontSize: "25px", color: "violet" }}
                    ></i>
                  </div>
                  <label>Alcohol Consumption</label>
                  <Checkbox {...checkbox3}>
                    Checked: {checkbox3.state + ""}
                  </Checkbox>
                </Form>
              </div>

              <div className="input-div one checkboxx">
                <Form>
                  <div className="i">
                    <i
                      className="fas fa-briefcase"
                      style={{ fontSize: "25px", color: "violet" }}
                    ></i>
                  </div>
                  <label>Caffine Consumption</label>
                  <Checkbox {...checkbox4}>
                    Checked: {checkbox4.state + ""}
                  </Checkbox>
                </Form>
              </div>

              <div className="input-div one checkboxx">
                <Form>
                  <div className="i">
                    <i
                      className="fas fa-briefcase"
                      style={{ fontSize: "25px", color: "violet" }}
                    ></i>
                  </div>
                  <label>Smoking</label>
                  <Checkbox {...checkbox5}>
                    Checked: {checkbox5.state + ""}
                  </Checkbox>
                </Form>
              </div>

              <div>
                <label>Other Comments</label>
                <FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    className="input"
                    id="OtherComments"
                    name="othercomments"
                    value={userReg.othercomments}
                    onChange={onChange}
                    placeholder="OtherComments"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </div>

              <div>
                <label>List of Drug Allergies</label>
                <FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    className="input"
                    id="List_of_Drug_Allergies"
                    name="list_of_drug_allergies"
                    value={userReg.list_of_drug_allergies}
                    onChange={onChange}
                    placeholder="list_of_drug_allergies"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </div>

              <div>
                <label>Other Illness</label>
                <FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    className="input"
                    id="Other_Illness"
                    name="other_illnesses"
                    value={userReg.other_illnesses}
                    onChange={onChange}
                    placeholder="Other_Illness"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </div>

              <div>
                <label>List of Operations</label>
                <FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    className="input"
                    id="List_of_Operations"
                    name="list_of_operations"
                    value={userReg.list_of_operations}
                    onChange={onChange}
                    placeholder="List_of_Operations"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
              </div>

              <div>
                <label>List of Current Medications</label>
                <FloatingLabel label="Comments">
                  <Form.Control
                    as="textarea"
                    className="input"
                    id="List_of_Current_Medications"
                    name="list_of_current_medications"
                    value={userReg.list_of_current_medications}
                    onChange={onChange}
                    placeholder="List_of_Current_Medications"
                    style={{ height: "100px" }}
                  />
                </FloatingLabel>
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
                    type="file"
                    className="input"
                    id="UserImage"
                    name="userImage"
                    placeholder="UserImage"
                    // onChange={handleChange}
                    onChange={(e)=>{setfile(e.target.files[0]
                      );console.log(file)}}
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
    </>
  );
};

export default UserRegister;


/*
<label htmlFor="upload-button">
                {image.preview ? (
                  <img
                    src={image.preview}
                    alt="dummy"
                    width="300"
                    height="300"
                  />
                ) : (
                  <>
                    <span className="fa-stack fa-2x mt-3 mb-2">
                      <i className="fas fa-circle fa-stack-2x" />
                      <i className="fas fa-store fa-stack-1x fa-inverse" />
                    </span>
                    <h5 className="text-center">Upload your photo</h5>
                  </>
                )}
              </label>*/