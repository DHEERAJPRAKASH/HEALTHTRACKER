import React, {useContext} from "react";
import DoctorContext from "../context/Doctors/DoctorContext";
import DoctorItem from "./DoctorItem"
import {Container,Row} from "react-bootstrap"
function Doctor() {
  const context = useContext(DoctorContext);
  const { doctor, setdoctor } = context;
  return (
    <div>
    <Container fluid="md">
      <h1>DOCTORS</h1>
      <Row>
      {doctor.map((doctor) => {
        return <DoctorItem doctor={doctor}/>
      })}
      </Row>
      </Container>
    </div>
  );
}

export default Doctor;