const connectToMongo = require('./db');

const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/userdetail',require('./routes/userroute'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

connectToMongo();