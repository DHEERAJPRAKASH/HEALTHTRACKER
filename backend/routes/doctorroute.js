const express = require("express");
const router = express.Router();
var fetchdoctor = require("../middleware/fetchdoctor");
const DetailDoctors = require("../models/DetailDoctors");
const { body, validationResult } = require("express-validator");

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/userdetails/getuser.LOGIN REQUIRED

router.get("/fetchdoctordetails", fetchdoctor, async (req, res) => {
  try {
    const detaildoctor = await DetailDoctors.find({ doctor: req.doctor.id });

    res.json([detaildoctor]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 - Logged in  user details adding details : GET "/api/userdetails/adduser.LOGIN REQUIRED
router.post(
  "/adddoctor",
  fetchdoctor,
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("experience", "Enter a valid experience").isLength({ min: 4 }),
    body("designation", "Enter a valid designation").isLength({ min: 3 }),
    body("working", "Enter a valid working").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { experience, designation, working } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    //   console.log(req.doctor.id);
      const doctordet = new DetailDoctors({
        doctor: req.doctor.id,
        experience,
        designation,
        working,
      });

    //   console.log(doctordet);

      const savedDoctor = await doctordet.save();

      res.json([savedDoctor]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details updating details : GET "/api/userdetails/updateuser.LOGIN REQUIRED
router.put("/updatedoctor/:id", fetchdoctor, async (req, res) => {
  const { experience, designation, working } = req.body;

  try {
    //Create a newUser object
    const newDoctor = {};
    //validate and check which field is available and update accordingly
    if (experience) {
      newDoctor.experience = experience;
    }
    if (designation) {
      newDoctor.designation = designation;
    }
    if (working) {
      newDoctor.working = working;
    }

    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let doctorupdate = await DetailDoctors.findById(req.params.id);
    console.log(doctorupdate);
    if (!doctorupdate) {
      return req.status(404).send("Not Found");
    }

    if (doctorupdate.doctor.toString() !== req.doctor.id) {
      return req.status(401).send("Not Allowed");
    }

    doctorupdate = await DetailDoctors.findByIdAndUpdate(
      req.params.id,
      { $set: newDoctor },
      { new: true }
    );
    res.json({ doctorupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 - Logged in  user details deleting details : GET "/api/userdetails/deleteuser.LOGIN REQUIRED
router.delete("/deletedoctor/:id", fetchdoctor, async (req, res) => {
  try {
    let doctorupdate = await DetailDoctors.findById(req.params.id);
    if (!doctorupdate) {
      return req.status(404).send("Not Found");
    }

    if (doctorupdate.doctor.toString() !== req.doctor.id) {
      return req.status(401).send("Not Allowed");
    }

    doctorupdate = await DetailDoctors.findByIdAndDelete(req.params.id);
    res.json({ Success: "Doctor Details has been deleted", doctorupdate: doctorupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
