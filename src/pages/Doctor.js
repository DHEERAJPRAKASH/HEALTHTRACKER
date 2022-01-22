import React, { useContext, useState, useEffect, useRef } from "react";
import DocUserContext from "../context/DocUserContext";
import { Button, Modal, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import DoctorItem from "./DoctorItem";
import DoctorConsult from "./DoctorConsult";
import { Container, Row } from "react-bootstrap";

import DoctorRegister from "./DoctorRegister";
function Doctor() {
  const context = useContext(DocUserContext);
  let history = useHistory();
  const { doctorComments } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // getDoctor();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const reload = () => window.location.reload();

  const ref = useRef(null);
  const refClose = useRef(null);
  const [doctors, setDoctor] = useState({
    id: "",
    eexperience: "",
    edesignation: "",
    eworking: "",
  });
  const [user, setUser] = useState("");

  const updateUser = (id, currentDoctor) => {
    ref.current.click();
    console.log("id in updateUser:" + id);
  };
  const handleSubmit = (id, currentUser) => {
    console.log(currentUser);
    console.log("user:" + user);
    const userId = id;
    console.log("userId:"+userId);
    const formData = new FormData();
    formData.append("worknature", currentUser.worknature);
    formData.append("exercisedaily", currentUser.exercisedaily);
    formData.append("eatingdiet", currentUser.eatingdiet);
    formData.append("alcoholconsumption", currentUser.alcoholconsumption);
    formData.append("caffeineconsumption", currentUser.caffeineconsumption);
    formData.append("smoking", currentUser.smoking);
    formData.append("othercomments", currentUser.othercomments);
    formData.append(
      "list_of_drug_allergies",
      currentUser.list_of_drug_allergies
    );
    formData.append("other_illnesses", currentUser.other_illnesses);
    formData.append("list_of_operations", currentUser.list_of_operations);
    formData.append(
      "list_of_current_medications",
      currentUser.list_of_current_medications
    );
    formData.append("doctor", currentUser.doctor);
    formData.append("complaint", currentUser.complaint);
    formData.append("doctorComments", user);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    doctorComments(userId, formData)
  };

  // const onChange = (e) => {
  //   setDoctor({ ...doctors, [e.target.name]: e.target.value });
  // };
  const onChange = (e) => {
    setUser(e.target.value);
    console.log(user);
  };

  return (
    <div style={{ overflowY: "scroll", maxHeight: "auto" }}>
      <Container fluid="md">
        <h1>DOCTORS</h1>

        <Button
          ref={ref}
          variant="primary"
          onClick={handleShow}
          style={{ display: "" }}
        >
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
              <Form.Label style={{ fontWeight: "bold" }}>
                Experience:
              </Form.Label>

              <Form.Control
                id="doctorComments"
                name="doctorComments"
                // value={user}
                onChange={onChange}
                placeholder="Docotor Comments"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button ref={refClose} variant="primary" onClick={handleClose}>
              OK
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>

        <DoctorConsult
          updateUser={updateUser}
          handleSubmit={handleSubmit}
        ></DoctorConsult>

        <DoctorRegister></DoctorRegister>
      </Container>
    </div>
  );
}

export default Doctor;

/* <Row>
          {doctor.map((doc) => {
            return (
              <DoctorItem
                key={doc._id}
                updateDoctor={updateDoctor}
                doctor={doc}
              />
            );
          })}
        </Row> */
