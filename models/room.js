// craete mongoose require package
const mongoose = require('mongoose');
const { type } = require('os');

// create a new room schema
const roomSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    rentperday:{
        type:Number,
        required:true
    },
    imageurls:[],
    currentbookings:[],
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }

},{
    timestamps:true,
});
// create a new model
const roomModel = mongoose.model('Room', roomSchema);//first one is collection name and second is schema which is already created above

module.exports=roomModel;
