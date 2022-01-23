import { useState} from "react";
import DocUserContext from "./DocUserContext";
import axios from "axios";


const DocUserState = (props) => {
  const host = "http://localhost:5000";
  const doctorInitial = [];
  const [doctor, setdoctor] = useState(doctorInitial);
  const userInitial = [];
  const [user, setuser] = useState(userInitial);
  

  const getDoctor = async () => {
    {
      let url = "http://localhost:5000/api/doctordetails/fetchdoctordetails";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        setdoctor(...data);
      }
    };
  };

  const getAllDoctor = async () => {
    {
      let url = "http://localhost:5000/api/doctordetails/fetchAllDoctordetails";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        console.log(data);
        setdoctor(...data);
      }
    };
  };

  // Add Doctor
  
  const addDoctor = async (name,experience, designation, working) => {
    let url = "http://localhost:5000/api/doctordetails/adddoctor";
    let options = {
      method: "POST",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      data: {
        name:name,
        experience: experience,
        designation: designation,
        working: working,
      },
    };
    let response = await axios(options);
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      let data = await response.data;
      setdoctor(doctor.concat(data));
    }
  };

  // Delete a Doctor
  const deleteDoctor = async (id) => {
    {
      let url = `${host}/api/doctordetails/deletedoctor/${id}`;
      let options = {
        method: "DELETE",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        // let data = await response.data;
        const newDoctor = doctor.filter((doc) => {
            return doc._id !== id;
          });
        setdoctor(newDoctor);
      }
    };
  };
  // Edit Doctor
  const editDoctor = async (id, name,experience, designation, working) => {
    
    let url = `${host}/api/doctordetails/updatedoctor/${id}`;
    let options = {
      method: "PUT",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      data: {
        name:name,
        experience: experience,
        designation: designation,
        working: working,
      },
    };
    let response = await axios(options);
    let data1;
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      let data = await response.data;
      // do something with data
      data1=data;
      // setdoctor(doctor);
    }
    
    for (let i = 0; i < doctor.length; i++) {
      const element = doctor[i];
      if (element._id == id) {
        element.experience = experience;
        element.designation = designation;
        element.working = working;
      }
    }
    console.log(data1);
    setdoctor(doctor);
    
  };
  
  // Get User Detail
  const getUser = async ()=>{
    {
      let url = "http://localhost:5000/api/userdetails/fetchuserdetails";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        setuser(...data);
      }
    };
  }

  //Add User
  const addUser = async (formData) => {
    let url = "http://localhost:5000/api/userdetails/adduser";
    let options = {
      method: "POST",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      data: formData,
    };
    let response = await axios(options);
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      let data = await response.data;
      setuser(user.concat(data));
    }
  };

  // Delete a User
  const deleteUser = async (id) => {
    {
      let url = `${host}/api/doctordetails/deletedoctor/${id}`;
      let options = {
        method: "DELETE",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        // let data = await response.data;
        const newDoctor = doctor.filter((doc) => {
            return doc._id !== id;
          });
        setuser(newDoctor);
      }
    };
  };
  // Edit User
  const editUser = async (id, experience, designation, working) => {
    
    let url = `${host}/api/doctordetails/updatedoctor/${id}`;
    let options = {
      method: "PUT",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      data: {
        experience: experience,
        designation: designation,
        working: working,
      },
    };
    let response = await axios(options);
    let data1;
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      // let data = await response.data;
    }
    
    for (let i = 0; i < doctor.length; i++) {
      const element = doctor[i];
      if (element._id == id) {
        element.experience = experience;
        element.designation = designation;
        element.working = working;
      }
    }
    console.log(data1);
    setuser(user);
    
  };


  const doctorConsult = async ()=>{
    {
      let url = "http://localhost:5000/api/doctordetails/fetchconsult";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        console.log("from doctorConsult:"+data)
        setdoctor(...data);
      }
    };
  }  

  const uploadUserComplaint = async () => {
    {
      let url = "http://localhost:5000/api/doctordetails/fetchdoctordetails";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        setdoctor(...data);
      }
    };
  };

  const doctorComments = async (id,formData) => {
    
    let url = `${host}/api/doctordetails/fetchconsult/${id}`;
    let options = {
      method: "PUT",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      data:formData,
    };
    console.log("from docuserState:"+formData);
    let response = await axios(options);
    let data1;
    let responseOK =
      response && response.status === 200 && response.statusText === "OK";
    if (responseOK) {
      // let data = await response.data;
    }
    
    for (let i = 0; i < doctor.length; i++) {
      const element = doctor[i];
      if (element._id == id) {
        // element.experience = experience;
        // element.designation = designation;
        // element.working = working;
      }
    }
    console.log(data1);
    setuser(user);
    
  };

  return (
    <DocUserContext.Provider
      value={{ user,doctor, getUser, getDoctor,getAllDoctor, addDoctor, deleteDoctor, editDoctor ,addUser, deleteUser, editUser , doctorConsult,uploadUserComplaint, doctorComments}}
    >
      {props.children}
    </DocUserContext.Provider>
  );
};

export default DocUserState;

// value in provider is like {{state1,update_function1},{state2,update_function2},...etc}
// <UserContext.Provider value={{state,update}}>
// {props.children}
// </UserContext.Provider>
