import { useState} from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserState = (props) => {
  const host = "http://localhost:5000";
  const userInitial = [];
  const [user, setuser] = useState(userInitial);
  
  const getUser = async () => {
    {
      let url = "http://localhost:5000/api/doctordetails/fetchdoctordetails";
      let options = {
        method: "GET",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
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
  };

  // Add Doctor
  
  const addUser = async (experience, designation, working) => {
    let url = "http://localhost:5000/api/doctordetails/adddoctor";
    let options = {
      method: "POST",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
      },
      data: {
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
      setuser(doctor.concat(data));
    }
  };

  // Delete a Doctor
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      if (responseOK) {
        let data = await response.data;
        const newDoctor = doctor.filter((doc) => {
            return doc._id !== id;
          });
        setuser(newDoctor);
      }
    };
  };
  // Edit Doctor
  const editUser = async (id, experience, designation, working) => {
    
    let url = `${host}/api/doctordetails/updatedoctor/${id}`;
    let options = {
      method: "PUT",
      url: url,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
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
      let data = await response.data;
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

  return (
    <UserContext.Provider
      value={{ user, getUser, addUser, deleteUser, editUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

// value in provider is like {{state1,update_function1},{state2,update_function2},...etc}
// <UserContext.Provider value={{state,update}}>
// {props.children}
// </UserContext.Provider>
