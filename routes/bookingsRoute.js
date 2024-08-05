const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require('uuid');
const { REPL_MODE_STRICT } = require("repl");
const stripe=require('stripe')('sk_test_51Pjsu3P16ruiyFoSwdAhlC9pyoOAYjfYwpt5dvMQAfiNfNf7MtUef3sjRBHTZCkXFagnHLVMc6a9cblzUhVJFI1r00acNrfq5E')

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totalDays, location ,token } = req.body;

  // Validate input
  if (!room || !userid || !fromdate || !todate || !totalamount || !totalDays || !location ||!token) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try{
    const customer=await stripe.customers.create({
      email:token.email,
      source : token.id
    })
    const payment=await stripe.charges.create(
      {
        amount : totalamount *100,
        customer : customer.id,
        currency : 'inr',
        receipt_email : token.email

      },{
        idempotencyKey : uuidv4()
      }
    )

    if(payment)
    {
        // Create a new booking
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate,
          todate,
          totalamount,
          totalDays,
          location, // Add location to booking
          transactionid: "1234", // Replace with a dynamic transaction ID in production
        });
    
        const booking = await newbooking.save();
    
        // Find the room and update bookings
        const roomtemp = await Room.findOne({ _id: room._id });
        if (!roomtemp) {
          return res.status(404).json({ error: "Room not found" });
        }
    
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate,
          todate,
          userid,
          status: booking.status,
          location // Add location to current bookings
        });
    
        await roomtemp.save();
    
    }
    res.send('payment successfull,your room is booked')

  }catch(error){
    return res.status(400).json({error})

  }

});

router.post("/getuserbookingsbyuserid",async(req,res)=>{
  const userid=req.body.userid

  try{
    const bookings=await Booking.find({userid : userid})
    res.send(bookings)
  }catch(error){
    return res.status(400).json({error});
  }
});

router.post("/cancelbooking",async(req,res)=>{
  const {bookingid,roomid}=req.body
  try{
    const bookingitem=await Booking.findOne({_id : bookingid})
    bookingitem.status='cancelled'
    await bookingitem.save()

    const room=await Room.findOne({_id : roomid})

    const bookings=room.currentbookings
    const temp=bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    room.currentbookings=temp

    await room.save()

    res.send('Your Booking cancelled Successfully')
  }catch(error){
    return res.status(400).json({error});

  }

});

router.get("/getallbookings",async(req,res)=>{
  try{
    const bookings=await Booking.find()
    res.send(bookings)
  }catch(error){
    return res.status(400).json({error})
  }
   
})
module.exports = router;
