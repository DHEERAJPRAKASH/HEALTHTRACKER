import React, { useContext, useState, useEffect } from "react";
import DocUserContext from "../context/DocUserContext";
import { useHistory } from "react-router";
import { Button, Form, FloatingLabel,Card,Col } from "react-bootstrap";

function DoctorConsult(props) {
  const context = useContext(DocUserContext);
  const { doctor, doctorConsult } = context;
  let history = useHistory();
  const { updateUser, handleSubmit } = props;
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      doctorConsult();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (<div>
    {doctor.map((doc)=>{
        return (<div className="col-3">
        <Col key={doc._id}>
          {doc.doctor=="" ? <Card className="mx-auto my-5 " style={{ width: "18rem" }} key={doc._id}>
            <Card.Body>
              <Card.Title>{doc.complaint}</Card.Title>
              <Card.Text>{doc.worknature}</Card.Text>
              <Card.Text>{doc.other_illnesses}</Card.Text>
        
              <Button variant="success" onClick = {()=>{updateUser(doc._id,doc)}}>
                Give Comments
              </Button>
              <Button variant="primary" onClick = {()=>{handleSubmit(doc._id,doc)}}>
                Submit
              </Button>
              
              
            </Card.Body>
          </Card> : ""}
        </Col>
      </div>);
    })}

    </div>);
}

export default DoctorConsult;
