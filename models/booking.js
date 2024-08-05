//import mongoose
const { timeStamp } = require("console");
const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    room:{
        type:String,require:true
    },
    roomid:{
        type:String,require:true
    },
    userid:{
        type:String,require:true
    },
    fromdate:{
        type:String,require:true
    },
    todate:{
        type:String,require:true
    },
    totalamount:{
        type:Number,require:true
    },
    totalDays:{
        type:Number,require:true
    },
    transactionid:{
        type:String,require:true
    },
    status:{
        type:String,require:true,default:'booked'
    },
    location: { // Added location field
        type: String,
        required: true
    }
},{
    timestamps: true,
})
//create model
const bookingmodel=mongoose.model('booking',bookingSchema)
//now export
module.exports=bookingmodel;
//go to route and import it 