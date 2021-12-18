const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const DetailUsers = require("../models/DetailUsers");
const { body, validationResult } = require("express-validator");

//ROUTE 1 - Logged in  user details retrieval using : GET "/api/auth/getuser.LOGIN REQUIRED

router.get("/fetchuserdetails", fetchuser, async (req, res) => {
  try {
    const detailuser = await DetailUsers.find({ user: req.user.id });

    res.json([detailuser]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 - Logged in  user details adding details : GET "/api/auth/adduser.LOGIN REQUIRED
router.post(
  "/adduser",
  fetchuser,
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
  ],
  async (req, res) => {
    try {
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
      //if there are errors, return bad request
      const errors = validationResult(req);

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
      });

      const savedUser = await userdet.save();

      res.json([savedUser]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
