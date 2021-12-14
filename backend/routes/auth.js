const express = require("express");
const User = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Dheerajisagoodb$oy'
//Create a User using : POST "/api/auth/. Doesn't require Auth. no login required"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    //if there are errors, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      // console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      // Hashing the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt)
      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
      // res.json(user);
      res.json({authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
  }
);

module.exports = router;
