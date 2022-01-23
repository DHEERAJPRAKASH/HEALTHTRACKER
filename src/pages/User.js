
import React, { useContext, useState, useEffect, useRef } from "react";
import DocUserContext from "../context/DocUserContext";
import { Button, Modal,Form} from "react-bootstrap";
import {useHistory} from "react-router";

import DoctorItem from "./DoctorItem";
import { Container, Row } from "react-bootstrap";

import UserRegister from "./UserRegister";
function Doctor() {
  let history = useHistory();

  const context = useContext(DocUserContext);
  const { doctor, getAllDoctor, editDoctor } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllDoctor();
    }
    else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reload=()=>window.location.reload();

  const ref = useRef(null);
  const refClose = useRef(null);
  const [doctors, setDoctor] = useState({
    id: "",
    ename:"",
    eexperience: "",
    edesignation: "",
    eworking: "",
  });

  const updateDoctor = (currentdoctor) => {
    ref.current.click();
    setDoctor({
      id: currentdoctor._id,
      ename:currentdoctor.name,
      eexperience: currentdoctor.experience,
      edesignation: currentdoctor.designation,
      eworking: currentdoctor.working,
    });
  };

  const handleClick = (e) => {
    editDoctor(
      doctors.id,
      doctors.ename,
      doctors.eexperience,
      doctors.edesignation,
      doctors.eworking
    );
    refClose.current.click();
    
  };

  const onChange = (e) => {
    setDoctor({ ...doctors, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ overflowY: "scroll", maxHeight: "800px" }}>
      <Container fluid="md">
        <h1>DOCTORS</h1>

        <Button ref={ref} variant="primary" onClick={handleShow} style={{ display: "none" }}>
          Launch static backdrop modal
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          onHide={reload}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Update your Profile if there is any changes has to be performed.
            <Form.Group className="mb-3">
              <Form.Label style={{fontWeight: "bold"}}>Name:</Form.Label>

              <Form.Control id="ename"
              name="ename"
              value={doctors.ename}
              onChange={onChange}
              placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{fontWeight: "bold"}}>Experience:</Form.Label>

              <Form.Control id="eexperience"
              name="eexperience"
              value={doctors.eexperience}
              onChange={onChange}
              placeholder="Experience" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{fontWeight: "bold"}}>Designation:</Form.Label>
              <Form.Control id="edesignation"
              name="edesignation"
              value={doctors.edesignation}
              onChange={onChange}placeholder="Designation"  />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{fontWeight: "bold"}}>Working:</Form.Label>
              <Form.Control id="eworking"
              name="eworking"
              value={doctors.eworking}
              onChange={onChange}placeholder="Working"  />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button ref={refClose} variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
            disabled={doctors.eexperience.length<3 || doctors.edesignation.length<5}
            onClick={handleClick}>
              UPDATE
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          {doctor.map((doc) => {
            return (
              <DoctorItem
                key={doc._id}
                updateDoctor={updateDoctor}
                doctor={doc}
              />
            );
          })}
        </Row>
       <UserRegister></UserRegister>
      </Container>
    </div>
  );
}

export default Doctor;
