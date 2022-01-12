import { useState } from "react";
import DoctorContext from "./DoctorContext";

const DoctorState = (props) => {
  const doctorInitial = [
    {
      experience: "2 years",
      designation: "MD DOCTOR",
      working: "SRM UNIVERSITY",
      __v: 0,
    },
  ];
  const [doctor, setdoctor] = useState(doctorInitial);
  // const [doctor, setdoctor] = useState(0);

  // Add Doctor
  const addDoctor = (experience, designation, working) => {
    console.log("Adding Doctor");

    const doc = {
      experience: experience,
      designation: designation,
      working: working,
      __v: 0,
    };
    console.log("before:"+experience);
    setdoctor(doctor.concat(doc));
    console.log(doctor);
  };
  // Delete a Doctor
  const deleteDoctor = () => {};
  // Edit Doctor
  const editDoctor = () => {};

  return (
    <DoctorContext.Provider
      value={{ doctor,addDoctor, deleteDoctor, editDoctor }}
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
