import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';


function Bookingscreen() {
    const [room, setRoom] = useState(null); // Initialize room state as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [totalAmount, setTotalAmount] = useState(0); // Initialize totalAmount state
    const { roomid, fromdate, todate } = useParams(); // Extract roomid, fromdate, and todate from the URL

    // Convert fromdate and todate to moment objects
    const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
    const toDateMoment = moment(todate, 'DD-MM-YYYY');

    // Calculate total days
    const totalDays = toDateMoment.diff(fromDateMoment, 'days'); 

    useEffect(() => {
        if(!localStorage.getItem('currentUser')){
            window.location.reload='/login'
        }
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const response = await axios.post('/api/rooms/getroombyid', { roomid });
                const roomData = response.data; // Use response.data to get room details
                setRoom(roomData);
                // Calculate totalAmount after setting room data
                const calculatedTotalAmount = totalDays * roomData.rentperday;
                setTotalAmount(calculatedTotalAmount);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error(error);
            }
        };

        fetchRoom(); // Call the async function inside useEffect
    }, [roomid, totalDays]); // Include totalDays as a dependency


    async function onToken(token){
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            location: room.location, // Add location to booking details
            fromdate,
            todate,
            totalamount: totalAmount,
            totalDays,
            token
        };

        try {
            setLoading(true)
            const result = await axios.post('/api/bookings/bookroom', bookingDetails);
            setLoading(false);
            Swal.fire('Congratulation','Your Room Booked Successfully','Success').then(result=>{
                window.location.href='/profile'
            })
        } catch (error) {
            setLoading(false)
            console.error("Error booking room:", error);
            Swal.fire('Oops','Something went wrong','error')
            // Handle errors here
        }
    }



    if (loading) {
        return <h1 className="text-center"><Loader /></h1>;
    }

    if (error || !room) {
        return <Error />;
    }

    

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <h1 className="card-title" style={{ color: '#6A5ACD' }}>{room.name}</h1>
                        {/* Check if imageurls is defined and has at least one image */}
                        {room.imageurls && room.imageurls.length > 0 ? (
                            <img 
                                src={room.imageurls[0]} 
                                alt={room.name} 
                                className="img-fluid rounded-start" 
                                style={{ maxHeight: '500px', objectFit: 'cover' }} 
                            />
                        ) : (
                            <div>No Image Available</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <p className="card-text"><strong>Booking Details</strong></p><hr/>
                            <p className="card-text"><strong>Name:</strong> {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                            <p className="card-text"><strong>Location:</strong> {room.location}</p>
                            <p className="card-text"><strong>From date:</strong> {fromdate}</p>
                            <p className="card-text"><strong>To date:</strong> {todate}</p>
                            <p className="card-text"><strong>Max count:</strong> {room.maxcount}</p>
                            <hr />
                            <p className="card-text"><strong>Amount</strong></p><hr/>
                            <p className="card-text"><strong>Total days:</strong> {totalDays}</p>
                            <p className="card-text"><strong>Rent per day:</strong> {room.rentperday}</p>
                            <p className="card-text"><strong>Total Amount:</strong> {totalAmount}</p> {/* Add total amount calculation */}
                            {/* <button className="btn btn-primary" onClick={bookRoom}>Pay now</button> */}

                            <StripeCheckout token={onToken} 
                            amount={totalAmount*100}
                            currency='INR'
                            stripeKey="pk_test_51Pjsu3P16ruiyFoSa11DjlWzYU0SgPtyUJPV7APK9EgVP2Z29VmnOsxrkVpHp1uznz46U1Ju37utkSpSDO3LB4PY00Y4tyYopP" >
                            <button className="btn btn-primary">Pay now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookingscreen;
