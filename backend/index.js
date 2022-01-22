const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = 5000
const fileuploader = require("express-fileupload")
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
app.use(fileuploader());
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/userdetails',require('./routes/userroute'));
app.use('/api/doctordetails',require('./routes/doctorroute'));

//added for videocalling

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "*",
// 		methods: [ "GET", "POST" ]
// 	}
// });

// app.get('/videoCalling', (req, res) => {
// 	res.send('Running');
// });

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id);

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});

// 	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});
// });

app.listen(port, () => {
  console.log(`HEALTH TRACKER BACKEND app listening at http://localhost:${port}`)
})

connectToMongo();
