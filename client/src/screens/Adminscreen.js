import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';


const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
      window.location.href = "/home"

    }
  },[])
  return (
    <div className="mt-3 ml-3 bs">
      <h2 className="text-center" style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><i className="fas fa-calendar-check"></i> Bookings</span>} key="1">
          <Bookings />
        </TabPane>
        <TabPane tab={<span><i className="fas fa-bed"></i> Rooms</span>} key="2">
          <Rooms/>
        </TabPane>
        <TabPane tab={<span><i className="fas fa-plus-square"></i> Add Room</span>} key="3">
          <Addroom/>
        </TabPane>
        <TabPane tab={<span><i className="fas fa-users"></i> Users</span>} key="4">
          <Users/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;


//Bookings List component
export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("api/bookings/getallbookings")).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}


        <table className="table table-bordered table-dark">
          <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>Location</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length && (bookings.map(booking=>{
              return <tr>
                <td>{booking._id}</td>
                <td>{booking.userid}</td>
                <td>{booking.room}</td>
                <td>{booking.location}</td>
                <td>{booking.fromdate}</td>
                <td>{booking.todate}</td>
                <td>{booking.status}</td>
                
              </tr>
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Rooms List component
export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("api/rooms/getallrooms")).data;
        setrooms(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className='bs'>
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Rent per day</th>
              <th>Max count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length && (rooms.map(room=>{
              return <tr>
                <td>{room._id}</td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.location}</td>
                <td>{room.rentperday}</td>
                <td>{room.maxcount}</td>
                <td>{room.phonenumber}</td>
                
              </tr>
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Users List component

export function Users(){
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await (await axios.get("api/users/getallusers")).data;
        setusers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className='bs'>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users && (users.map(user=>{
              return <tr>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes':'No'}</td>
                <td>{user.number}</td>
                
              </tr>
            }))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Add room List component
export function Addroom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setname] = useState('');
  const [rentperday, setrentperday] = useState('');
  const [maxcount, setmaxcount] = useState('');
  const [description, setdescription] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [location, setlocation] = useState('');
  const [type, settype] = useState('');
  const [imageurl1, setimageurl1] = useState('');
  const [imageurl2, setimageurl2] = useState('');
  const [imageurl3, setimageurl3] = useState('');

  async function addRoom() {
    const imageurls = [imageurl1, imageurl2, imageurl3];
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      location,
      type,
      imageurls,  // Add the array of image URLs here
    };

    try {
      setLoading(true);
      const result = await (await axios.post('/api/rooms/addroom', newroom)).data;
      console.log(result);
      setLoading(false);
      Swal.fire('Congrats','Your new Room Added Successfully','success').then(result=>{
        window.location.href='/home';
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire('Oops','Something went wrong','error')


    }
  }

  return (
    <div className='row'>
      <div className='col-md-6'>
        {loading && <Loader/>}
        <input type='text' className='form-control' placeholder='Room name' value={name} onChange={(e) => { setname(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Rent per day' value={rentperday} onChange={(e) => { setrentperday(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Max count' value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Description' value={description} onChange={(e) => { setdescription(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Phone number' value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }} />
      </div>
      <div className='col-md-6'>
        <input type='text' className='form-control' placeholder='Location' value={location} onChange={(e) => { setlocation(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Room Type' value={type} onChange={(e) => { settype(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image url 1' value={imageurl1} onChange={(e) => { setimageurl1(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image url 2' value={imageurl2} onChange={(e) => { setimageurl2(e.target.value) }} />
        <input type='text' className='form-control' placeholder='Image url 3' value={imageurl3} onChange={(e) => { setimageurl3(e.target.value) }} />

        <div className='text-right'>
          <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
        </div>
      </div>
    </div>
  );
}
