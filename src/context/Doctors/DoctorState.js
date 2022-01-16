import { useState } from "react";
import DoctorContext from "./DoctorContext";
import axios from "axios";

const DoctorState = (props) => {
  const host = "http://localhost:5000";
  const doctorInitial = [];
  const [doctor, setdoctor] = useState(doctorInitial);
  // const [doctor, setdoctor] = useState(0);

  const getDoctor = async () => {
    const response = await fetch(
      `${host}/api/doctordetails/fetchdoctordetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Accept':'application/json',
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
        },
      }
    );
    const Json = await response.json();
    console.log(Json);
    setdoctor(...Json);
  };

  // Add Doctor
  
  const addDoctor = async (experience, designation, working) => {
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
      // do something with data
      setdoctor(doctor.concat(data));
    }
  };

  // Delete a Doctor
  const deleteDoctor = async (id) => {
    const response = await fetch(
      `${host}/api/doctordetails/deletedoctor/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
        },
      }
    );
    const Json = response.json();
    console.log("Deleting the note with id:" + id);
    const newDoctor = doctor.filter((doc) => {
      return doc._id !== id;
    });
    setdoctor(newDoctor);
  };
  // Edit Doctor
  const editDoctor = async (id, experience, designation, working) => {
    const response = await fetch(
      `${host}/api/doctordetails/updatedoctor/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiZGViMGE0MjViYmY3NDI5YzM1YzI4In0sImlhdCI6MTYzOTgzNjQyN30.cMieELl22cHSIdKXyINrlU8g-uQweTqfCEy7-gXMQUA",
        },
        body: JSON.stringify({ experience, designation, working }),
      }
    );
    const json = response.json();

    for (let i = 0; i < doctor.length; i++) {
      const element = doctor[i];
      if (element._id == id) {
        element.experience = experience;
        element.designation = designation;
        element.working = working;
      }
    }
  };

  return (
    <DoctorContext.Provider
      value={{ doctor, getDoctor, addDoctor, deleteDoctor, editDoctor }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;

// value in provider is like {{state1,update_function1},{state2,update_function2},...etc}
// <UserContext.Provider value={{state,update}}>
// {props.children}
// </UserContext.Provider>
