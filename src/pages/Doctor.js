import React, {useContext} from "react";
import DoctorContext from "../context/Doctors/DoctorContext";
import DoctorItem from "./DoctorItem"
import {Container,Row} from "react-bootstrap"

import DoctorRegister from "./DoctorRegister"
function Doctor() {
  const context = useContext(DoctorContext);
  const { doctor, addDoctor } = context;
  return (
    <div style={{overflowY:"scroll",maxHeight:"600px"}}>
    <Container fluid="md" >
      <h1>DOCTORS</h1>

      <Row>
      {doctor.map((doctor) => {
        return <DoctorItem doctor={doctor}/>
      })}
      </Row>

      <DoctorRegister></DoctorRegister>
    </Container>
    </div>
  );
}

export default Doctor;