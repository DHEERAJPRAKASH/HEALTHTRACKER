import React from "react";
import {Card,Button,Col} from "react-bootstrap"
function DoctorItem(props) {
  const { doctor } = props;
  // console.log(user)
  return (
    <div className="col-3">
     <Col >
      <Card className ="mx-auto my-5 " style={{ width: "18rem" }}>
        
        <Card.Body>
          <Card.Title>{doctor.worknature}</Card.Title>
          <Card.Text>
            {doctor.other_illnesses}
          </Card.Text>
          <Button variant="success">VISIT</Button>
        </Card.Body>
      </Card>
      </Col>
      
    </div>
  );
}

export default DoctorItem;
