import React from "react";
import {Card,Button,Col} from "react-bootstrap"
function DoctorItem(props) {
  const { doctor } = props;
  // console.log(user)
  return (
    <div>
     <Col>
      <Card style={{ width: "18rem" }}>
        
        <Card.Body>
          <Card.Title>{doctor.worknature}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="success">VISIT</Button>
        </Card.Body>
      </Card>
      </Col>
      
    </div>
  );
}

export default DoctorItem;
