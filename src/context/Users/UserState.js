import react from "react";
import UserContext from "./userContext";

const UserState = (props)=>{

    const state = {
        "name" : "Harry",
        "class": "5b"
    }
    return(
        <UserContext.provider value={state}>
           {props.children}

        </UserContext.provider>
    )
}

export default UserState;