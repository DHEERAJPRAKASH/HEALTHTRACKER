import React,{useContext} from "react";
import {Card,Button,Col} from "react-bootstrap";
import DoctorContext from "../context/Doctors/DoctorContext";
function DoctorItem(props) {
  const { doctor } = props;
  const context = useContext(DoctorContext)
  const {deleteDoctor} = context;
  // console.log(user)
  // const image = doctor
  return (
    <div className="col-3" >
     <Col >
      <Card className ="mx-auto my-5 " style={{ width: "18rem" }}>
        
        <Card.Body>
        
          <Card.Title>{doctor.experience}</Card.Title>
          <Card.Text>
            {doctor.designation}
          </Card.Text>
          <Card.Text>
            {doctor.working}
          </Card.Text>
          <Button variant="success" onClick={()=>{deleteDoctor(doctor._id)}} >VISIT</Button>
          </Card.Body>
      </Card>
      </Col>
      
    </div>
  );
}

export default DoctorItem;
