import React, { useContext } from "react";
import { Card, Button, Col } from "react-bootstrap";
import DocUserContext from "../context/DocUserContext";
import { useHistory } from "react-router-dom";
import UserRegister from "./UserRegister";
function DoctorItem(props) {
  const { doctor, updateDoctor } = props;
  const context = useContext(DocUserContext);
  const { deleteDoctor } = context;
  let history = useHistory();
  const handleConsult = (e)=>{
    const a = sessionStorage.setItem('doctorId',doctor.doctor);
    const b = sessionStorage.getItem('doctorId');
    console.log("doctor id:"+b);
    history.push("/userComplaints");
  }
 
  return (
    <div className="col-3">
      <Col>
        <Card className="mx-auto my-5 " style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{doctor.name}</Card.Title>
            <Card.Title>{doctor.experience}</Card.Title>
            <Card.Text>{doctor.designation}</Card.Text>
            <Card.Text>{doctor.working}</Card.Text>
            <Button
              variant="danger"
              onClick={() => {
                alert("Doctor id:"+doctor.doctor)
                //deleteDoctor(doctor._id);
              }}
            >
              DELETE
            </Button>
            <Button variant="success" onClick={()=>{updateDoctor(doctor)}}>
              UPDATE
            </Button>
            <Button variant="primary"  onClick={handleConsult}>
              CONSULT
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}

export default DoctorItem;
