const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    name:{
        type:String,require:true
    },
    email:{
        type:String,require:true
    },
    password:{
        type:String,require:true
    },
    number:{
        type:String,require:true
    },
    isAdmin:{
        type:Boolean, default:true
    }
},{
    timestamps: true,
})

const userModel=mongoose.model('users',userSchema)
module.exports=userModel;
//Now im created my model
//Next im going to create a routes for the users operation