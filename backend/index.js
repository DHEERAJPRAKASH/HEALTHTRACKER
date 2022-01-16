const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = 5000

// added on 09/01/2022
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
  
var fs = require('fs');
var path = require('path');
var cors = require('cors');

require('dotenv/config');
//end of that date
app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'));
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/userdetails',require('./routes/userroute'));
app.use('/api/doctordetails',require('./routes/doctorroute'));



app.listen(port, () => {
  console.log(`HEALTH TRACKER BACKEND app listening at http://localhost:${port}`)
})

connectToMongo();
