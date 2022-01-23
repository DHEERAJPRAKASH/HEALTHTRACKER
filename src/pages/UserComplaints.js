import React, { useEffect, useState, useContext } from "react";
import DocUserContext from "../context/DocUserContext";
import { useHistory } from "react-router";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import axios from "axios";


function UserComplaints() {
  const context = useContext(DocUserContext);
  let history = useHistory();
  const { user, getUser } = context;
  const [userReg, setuserReg] = useState("");
  // const [userDetail, setuserDetail] = useState(null);
  const doctorId = sessionStorage.getItem('doctorId');
  const onChange = (e) => {
    setuserReg( e.target.value );
    console.log(userReg);
    console.log(user);
    // console.log(user[0].worknature);
    console.log(doctorId);

  };
 
  

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  
  const handleSubmit = (e)=>{
    // console.log(userDetail.userImage);
    const formData = new FormData();
    formData.append("name",user[0].name);
    formData.append("worknature", user[0].worknature);
    formData.append("exercisedaily", user[0].exercisedaily);
    formData.append("eatingdiet",user[0].eatingdiet);
    formData.append("alcoholconsumption",user[0].alcoholconsumption);
    formData.append("caffeineconsumption",user[0].caffeineconsumption);
    formData.append("smoking", user[0].smoking);
    formData.append("othercomments", user[0].othercomments);
    formData.append("list_of_drug_allergies", user[0].list_of_drug_allergies);
    formData.append("other_illnesses", user[0].other_illnesses);
    formData.append("list_of_operations", user[0].list_of_operations);
    formData.append("list_of_current_medications",user[0].list_of_current_medications);
    formData.append("userImage", user[0].userImage);
    formData.append("doctor",doctorId);
    formData.append("complaint",userReg);
    
    
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    

    let url = "http://localhost:5000/api/userdetails/uploadDetail";
    let options = {
      method: "POST",
      url: url,
      headers: {
        // "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('token'),
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
      // setuser(user.concat(data));
    }

  }

  return (
    <div>
      <div className="container" style={{ padding: "2rem 30rem 2rem" }}>
        <form onSubmit={handleSubmit}>
          <h1>Welcome User</h1>
          <h2>Enter Your Health Issues for Review in the box!!</h2>
          <FloatingLabel>
            <Form.Control
              as="textarea"
              className="input"
              id="complaints"
              name="complaints"
              // value={userReg}
              onChange={onChange}
              placeholder="User   Health Complaints"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Button type="submit">Submit</Button>
          </form>
      </div>
    </div>
  );
}

export default UserComplaints;
