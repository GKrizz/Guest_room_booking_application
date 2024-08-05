import React, { useEffect ,useState} from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert2'
import { Divider, Flex, Tag } from 'antd';


const {TabPane}=Tabs;

function Profilescreen() {
  const user =JSON.parse(localStorage.getItem("currentUser"))
  useEffect(()=>{
    if(!user){
      window.location.href='/login'
    }

  
  },[user])


  return (
    <div className="ml-3 mt-3">
        <Tabs defaultActiveKey="1">
            <TabPane tab="Profile" key="1">
                <h1>My Profile</h1>

                <br/>

                <h1>Name :{user.name}</h1>
                <h1>Email :{user.email}</h1>
                <h1>isAdmin :{user.isAdmin?'Yes':'No'}</h1>
            </TabPane>
            <TabPane tab="Bookings" key="2">
                <MyBookings/>
            </TabPane>
        </Tabs>
    </div>
  )
}

export default Profilescreen

export function MyBookings(){
  const user =JSON.parse(localStorage.getItem("currentUser"))
  const [bookings,setbookings]=useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
 
  useEffect(() => {
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/bookings/getuserbookingsbyuserid', { userid: user._id });
            setbookings(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            console.error(error);
        }
    };

    fetchBookings(); // Call the function
}, [user._id]); // Add user._id as a dependency


  async function cancelBooking(bookingid,roomid){
    try{
      setLoading(true)
      const result=await(await axios.post("/api/bookings/cancelbooking",{bookingid,roomid})).data
      console.log(result)
      setLoading(false)
      swal.fire('Congrats','your booking has been cancelled','success').then(result=>{
        window.location.reload()
      })
    }catch(error){
      console.log(error)
      setLoading(false)
      swal.fire('Oops','Something went wrong','error')
    }

  }

  return(
    <div>
      <div className="row">
        <div className="col-md-5">
          {loading && (<Loader/>)}
          {bookings && (bookings.map(booking=>{
            return <div className="bs">
                      <h1>{booking.room}</h1>
                      <p><b>Booking Id</b>: {booking._id}</p>
                      <p><b>CheckIn</b> : {booking.fromdate}</p>
                      <p><b>Check Out</b> : {booking.todate}</p>
                      <p><b>Amount</b> : {booking.totalamount}</p>
                      <p><b>Status</b> : {""}
                      {booking.status=='cancelled' ? (<Tag color="red">CANCELLED</Tag>): (<Tag color="green">CONFIRMED</Tag>)}
                      </p>


                      {booking.status !== 'cancelled' && (
                        <div className="text-right">
                            <button className="btn btn-primary" onClick={()=>{cancelBooking(booking._id,booking.roomid)}}>Cancel Booking</button>
                        </div>
                      )}
                    </div>
          }))}

        </div>

      </div>
    </div>
  )
}