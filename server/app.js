const express = require("express");
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require("./keys")

// deferent approach to importing the user model. Can still use the typical approach of exporting the schema from the schemma files and require them 
// in the app files.Different approaches but will still work
require("./model/user")
app.use(express.json())

app.use(require("./routes/auth"))

mongoose.connect(MONGOURI)

mongoose.connection.on("connected",()=>{
  console.log("Connected to Mongo Yeaahh")
})

mongoose.connection.on("error",(err)=>{
  console.log("err connectin", err)
})

app.listen(PORT, ()=>{
  console.log("server is running on", PORT)
})