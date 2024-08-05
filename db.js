const mongoose = require("mongoose");
const { connected } = require("process");

//now connect the database with the help of mongoose package
var mongoURL = 'mongodb+srv://Gobala_Krishnan:dhanabal%40123@cluster0.islnsj6.mongodb.net/Guest_Room_Booking_db'

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})// this mongoose.connect accept 3 parameter 1.link 2.mongoose follows 2 safety param 1)useUnifiedTopology 2)useNewUrlParser

//craete a connection variable
var connection=mongoose.connection
//check whether the connection is success or fail
connection.on('error',()=>{
    console.log("Mongo DB connection failed❌")
})

connection.on('connected',()=>{
    console.log("Mongo DB connection is successful🔥🔥")
})

//now im going to use db.js in server.js
module.exports=mongoose

//next go to server and write dbconfig