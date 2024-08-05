// import the express as well as router
const express = require('express');
const router= express.Router();//router package

//import mongodb room model here bcz im going to fetch the rooms
const Room = require('../models/room'); //import the room model
const { request } = require('http');


//this is my first API end point it is used to fetch all API endpoint to fetch all the details of the rooms
router.get('/getallrooms', async (req, res) =>{
    try{
        const rooms=await Room.find({})//this line will bring all the rooms which are present in the mongo db
        res.send(rooms)
    }catch(error){
        return res.status(400).json({message:error.message});
    }
});

router.post('/getroombyid', async (req, res) =>{
    const roomid=req.body.roomid
    try{
        const room=await Room.findOne({_id:roomid})//this line will bring all the rooms which are present in the mongo db
        res.send(room)
    }catch(error){
        return res.status(400).json({message:error.message});
    }
});

router.post('/addroom',async(req,res)=>{
    try {
        const newroom=new Room(req.body)
        await newroom.save()
        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }
});

// export this router in server endpoint
module.exports = router;