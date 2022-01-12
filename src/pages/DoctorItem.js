import React from "react";
import {Card,Button,Col} from "react-bootstrap"
function DoctorItem(props) {
  const { doctor } = props;
  // console.log(user)
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
          <Button variant="success">VISIT</Button>
        </Card.Body>
      </Card>
      </Col>
      
    </div>
  );
}

export default DoctorItem;
