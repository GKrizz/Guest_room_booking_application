const express =require("express");//initalise the express
const app = express();//create app | with the help of app variable we can create the server 

const dbConfig=require('./db')
// -----------------------------------------------------------------------

const roomsRoute=require('./routes/roomsRoute')
const usersRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')

app.use(express.json())
// -----------------------------------------------------------------------
app.use('/api/rooms',roomsRoute)// create the access for the rooms route
app.use('/api/users',usersRoute)// create the access for the users route
app.use('/api/bookings',bookingsRoute)//its for booking route



const port=process.env.PORT || 5000; //default port & manual port
app.listen(port,()=>console.log(`Node server running on port ${port} using nodemon`));//method to start node.js server