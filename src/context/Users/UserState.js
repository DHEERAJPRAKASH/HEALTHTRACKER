import {useState} from "react";
import UserContext from "./userContext";

const UserState = (props)=>{
    return(
        <UserContext.Provider value={{}}>
        {props.children}</UserContext.Provider>
    )
}

export default UserState;

// value in provider is like {{state1,update_function1},{state2,update_function2},...etc}
// <UserContext.Provider value={{state,update}}>
// {props.children}
// </UserContext.Provider>