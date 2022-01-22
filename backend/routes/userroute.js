const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const DetailUsers = require("../models/DetailUsers");
const UploadUsers = require("../models/UploadDetail");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
//the below gives a separate folder for saving images
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    // cb(null,new Date().toISOString + file.originalname);
    cb(null,file.originalname);
    console.log("Inside multer storage")
    // return file;
    // cb(null, file.fieldname + '_' + Date.now() 
    //          + path.extname(file.originalname))
  }
})

const fileFilter = (req,file,cb) =>{
  //reject a file 
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}
const upload = multer({
  storage : storage, 
  limits : {
    fileSize : 1024 * 1024 * 5
  },
  fileFilter : fileFilter
});
// upload = multer({storage:storage})

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/userdetails/getuser.LOGIN REQUIRED

router.get("/fetchuserdetails", fetchuser, async (req, res) => {
  try {
    const detailuser = await DetailUsers.find({ user: req.user.id });

    console.log(detailuser);
    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//ROUTE 2 - Logged in  user details adding details : GET "/api/userdetails/adduser.LOGIN REQUIRED
router.post(
  "/adduser",
  fetchuser,
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
      const {data, mimetype}=req.files.userImage;
      console.log(req.body.smoking)
      // console.log("data:"+data);
      console.log("mimetype:"+mimetype);
      console.log("fresher")
      console.log("image:"+req.files.userImage);

      console.log("path of file: "+req.files.userImage.path);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdet = new DetailUsers({
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
        userImage : req.files.userImage.name,
        // userImage : req.file.originalname,
      });

      
      console.log("name:"+req.files.userImage.name)
      
      // let path = req.files.userImage.name;
      // userdet.userImage.data = fs.readFileSync(path);
      // userdet.userImage.contentType = 'image/jpeg'
      
      // upload.single(req.files.userImage);
      const savedUser = await userdet.save();
      console.log("saved user"+savedUser);


      res.json([savedUser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 - Logged in  user details updating details : GET "/api/userdetails/updateuser.LOGIN REQUIRED
router.put("/updateuser/:id", fetchuser, async (req, res) => {
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
  } = req.body;

  try {
    //Create a newUser object
    const newUser = {};
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

    //Find the userdetail to be updated and update it
    //Always validate the user and update which is done below
    let userupdate = await DetailUsers.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await DetailUsers.findByIdAndUpdate(
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

//ROUTE 4 - Logged in  user details deleting details : GET "/api/userdetails/deleteuser.LOGIN REQUIRED
router.delete("/deleteuser/:id", fetchuser, async (req, res) => {
  try {
    let userupdate = await DetailUsers.findById(req.params.id);
    if (!userupdate) {
      return req.status(404).send("Not Found");
    }

    if (userupdate.user.toString() !== req.user.id) {
      return req.status(401).send("Not Allowed");
    }

    userupdate = await DetailUsers.findByIdAndDelete(req.params.id);
    res.json({ Success: "User Details has been deleted", userupdate: userupdate });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Route to upload details to doctor
router.post(
  "/uploadDetail",
  fetchuser,
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
        doctor,
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
        complaint,
        doctorComments
        // userImage
      } = req.body;
      //if there are errors, return bad request
      const errors = validationResult(req);
      // const {data, mimetype}=req.files.userImage;
      console.log(req.body.smoking)
      

      // console.log("path of file: "+req.files.userImage.path);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const userdet = new UploadUsers({
        user: req.user.id,
        doctor,
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
        complaint,
        doctorComments
      });

      
     
      
      // upload.single(req.files.userImage);
      const savedUser = await userdet.save();
      console.log("saved user"+savedUser);


      res.json([savedUser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route to fetch details about a single user
// router.get("/fetchuserdetails/:id", fetchuser, async (req, res) => {
//   try {
//     const detailuser = await DetailUsers.find({ user: req.user.id });

//     console.log(detailuser);
//     res.json([detailuser]);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
module.exports = router;
