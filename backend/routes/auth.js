const express = require('express');
const router = express.Router();
const User = require('../models/Users')

//Create a User using : POST "/api/auth/. Doesn't require Auth"
router.post('/',(req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send('hello');
})

module.exports = router;