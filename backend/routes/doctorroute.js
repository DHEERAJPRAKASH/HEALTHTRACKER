const express = require("express");
const router = express.Router();
var fetchdoctor = require("../middleware/fetchdoctor");
const DetailDoctors = require("../models/DetailDoctors");
const UploadUsers = require("../models/UploadDetail");

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

//To fetch all doctor list without authentication
router.get("/fetchAllDoctordetails", async (req, res) => {
  try {
    const detaildoctor = await DetailDoctors.find();

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
    res.json({
      Success: "Doctor Details has been deleted",
      doctorupdate: doctorupdate,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/uploadDetail",
  fetchdoctor,
  // upload.single('userImage'),
  [
    // body("dob", "Enter a valid DateofBirth").isDate(),
    body("worknature", "Enter a valid worknature").isLength({ min: 4 }),
    body("exercisedaily", "Enter a valid value for exercise daily").isBoolean(),
    body("eatingdiet", "Enter a valid value for eating diet").isBoolean(),
    body(
      "alcoholconsumption",
      "Enter a valid value for alcoholconsumption"
    ).isBoolean(),
    body(
      "caffeineconsumption",
      "Enter a valid value for caffeineconsumption"
    ).isBoolean(),
    body("smoking", "Enter a valid value for smoking").isBoolean(),
    body("othercomments", "Enter a valid othercomments").isLength({ min: 3 }),
    body(
      "list_of_drug_allergies",
      "Enter a valid list_of_drug_allergies"
    ).isLength({ min: 3 }),
    body("other_illnesses", "Enter a valid other_illnesses").isLength({
      min: 3,
    }),
    body("list_of_operations", "Enter a valid list_of_operations").isLength({
      min: 3,
    }),
    body(
      "list_of_current_medications",
      "Enter a valid list_of_current_medications"
    ).isLength({ min: 3 }),
    // added on 10/01/2022
    // upload.single('userImage')
  ],
  async (req, res) => {
    try {
      // added on 10/01/2022

      const {
        worknature,
        exercisedaily,
        eatingdiet,
        alcoholconsumption,
        caffeineconsumption,
        smoking,
        othercomments,
        list_of_drug_allergies,
        other_illnesses,
        list_of_operations,
        list_of_current_medications,
        // userImage
      } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);
      // const {data, mimetype}=req.files.userImage;
      console.log(req.body.smoking);

      // console.log("path of file: "+req.files.userImage.path);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdet = new UploadUsers({
        user: req.user.id,
        worknature,
        exercisedaily,
        eatingdiet,
        alcoholconsumption,
        caffeineconsumption,
        smoking,
        othercomments,
        list_of_drug_allergies,
        other_illnesses,
        list_of_operations,
        list_of_current_medications,
      });

      // upload.single(req.files.userImage);
      const savedUser = await userdet.save();
      console.log("saved user" + savedUser);

      res.json([savedUser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/fetchconsult", fetchdoctor, async (req, res) => {
  try {
    const doctor = req.doctor.id;
    console.log(doctor.toString());
    const detaildoctor = await UploadUsers.find({ doctor: req.doctor.id });

    res.json([detaildoctor]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/fetchconsult/:id", fetchdoctor, async (req, res) => {
  const {
    worknature,
    exercisedaily,
    eatingdiet,
    alcoholconsumption,
    caffeineconsumption,
    smoking,
    othercomments,
    list_of_drug_allergies,
    other_illnesses,
    list_of_operations,
    list_of_current_medications,
    doctorComments
  } = req.body;

  try {
    //Create a newUser object
    const newUser = {};
    console.log("I am id:"+req.params.id)
    //validate and check which field is available and update accordingly
    if (worknature) {
      newUser.worknature = worknature;
    }

    newUser.exercisedaily = exercisedaily;
    newUser.eatingdiet = eatingdiet;
    newUser.alcoholconsumption = alcoholconsumption;
    newUser.caffeineconsumption = caffeineconsumption;
    newUser.smoking = smoking;

    if (othercomments) {
      newUser.othercomments = othercomments;
    }
    if (list_of_drug_allergies) {
      newUser.list_of_drug_allergies = list_of_drug_allergies;
    }
    if (other_illnesses) {
      newUser.other_illnesses = other_illnesses;
    }
    if (list_of_operations) {
      newUser.list_of_operations = list_of_operations;
    }
    if (list_of_current_medications) {
      newUser.list_of_current_medications = list_of_current_medications;
    }
    if(doctorComments){
      newUser.doctorComments = doctorComments;
    }

    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let userupdate = await UploadUsers.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    console.log("user update:"+req.body);
    console.log("user id:"+req.doctor.id);
    if (userupdate.doctor.toString() !== req.doctor.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await UploadUsers.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ userupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
 

module.exports = router;
