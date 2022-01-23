import React, { useContext, useState, useEffect } from "react";
import DocUserContext from "../context/DocUserContext";
import { useHistory } from "react-router";
import { Button,Row, Card, Col } from "react-bootstrap";

function DoctorConsult(props) {
  const context = useContext(DocUserContext);
  const { doctor, doctorConsult } = context;
  let history = useHistory();
  const { updateUser, handleSubmit } = props;
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      doctorConsult();
      console.log(doctor)
      
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
     <Row>
      {doctor.map((doc) => {
        return (
          <div className="col-3">
            <Col key={doc._id}>
              <Card
                className="mx-auto my-5 "
                style={{ width: "18rem" }}
                key={doc._id}
              >
                <Card.Body>
                  <Card.Title>{doc.name}</Card.Title>
                  <Card.Text>{doc.worknature}</Card.Text>
                  <Card.Text>{doc.other_illnesses}</Card.Text>

                  <Button
                    variant="success"
                    onClick={() => {
                      updateUser(doc._id, doc);
                    }}
                  >
                    Give Comments
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleSubmit(doc._id, doc);
                    }}
                  >
                    Submit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </div>
        );
      })}
      </Row>
    </div>
  );
}

export default DoctorConsult;
