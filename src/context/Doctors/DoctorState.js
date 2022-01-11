import {useState} from "react";
import DoctorContext from "./DoctorContext";

const DoctorState = (props)=>{
    const doctorInitial = [{
        "_id": "61bd9500954e1bce995dc88c",
        "user": "61b83d14573bc84cac1a67b4",
        "worknature": "overheated",
        "exercisedaily": true,
        "eatingdiet": true,
        "alcoholconsumption": false,
        "caffeineconsumption": false,
        "smoking": false,
        "othercomments": "No comments",
        "list_of_drug_allergies": "nothing",
        "other_illnesses": "1.wheezing,2.cold",
        "list_of_operations": "nothing",
        "list_of_current_medications": "nothing",
        "date": "2021-12-18T08:00:00.516Z",
        "__v": 0
      },
      {
        "_id": "61bd9500954e1bce995dc88c",
        "user": "61b83d14573bc84cac1a67b4",
        "worknature": "overheated",
        "exercisedaily": true,
        "eatingdiet": true,
        "alcoholconsumption": false,
        "caffeineconsumption": false,
        "smoking": false,
        "othercomments": "No comments",
        "list_of_drug_allergies": "nothing",
        "other_illnesses": "1.wheezing,2.cold",
        "list_of_operations": "nothing",
        "list_of_current_medications": "nothing",
        "date": "2021-12-18T08:00:00.516Z",
        "__v": 0
      }
    ]
    const [doctor, setdoctor] = useState(doctorInitial)

    return(
        <DoctorContext.Provider value={{doctor,setdoctor}}>
        {props.children}</DoctorContext.Provider>
    )
}

export default DoctorState;

// value in provider is like {{state1,update_function1},{state2,update_function2},...etc}
// <UserContext.Provider value={{state,update}}>
// {props.children}
// </UserContext.Provider>