import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from '../components/Room'; // Import the Room component
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/antd.css'; // Ensure this is imported
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();
    const [duplicaterooms, setduplicaterooms] = useState([]); // Initializing as an empty array
    const [searchkey, setsearchkey] = useState('');
    const [type, settype] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const response = await axios.get('/api/rooms/getallrooms');
                setrooms(response.data);
                setduplicaterooms(response.data); // Assign response.data (rooms array) to duplicaterooms
                setloading(false);
            } catch (error) {
                seterror(true);
                console.error(error);
                setloading(false);
            }
        };
        fetchData(); // Call the async function inside useEffect
    }, []); // Empty dependency array means this effect runs once on mount

    // Check for overlap in dates
    function isDateRangeAvailable(room, selectedStartDate, selectedEndDate) {
        for (const booking of room.currentbookings) {
            const bookingStartDate = moment(booking.fromdate, 'DD-MM-YYYY');
            const bookingEndDate = moment(booking.todate, 'DD-MM-YYYY');

            // If the selected date range overlaps with the booking, return false
            if (
                selectedStartDate.isBetween(bookingStartDate, bookingEndDate, null, '[)') ||
                selectedEndDate.isBetween(bookingStartDate, bookingEndDate, null, '(]') ||
                selectedStartDate.isSame(bookingStartDate) ||
                selectedEndDate.isSame(bookingEndDate)
            ) {
                return false; // Room is not available for the selected range
            }
        }
        return true; // Room is available for the selected range
    }

    // Filter rooms by selected date range
    function filterByDate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
        settodate(moment(dates[1]).format('DD-MM-YYYY'));

        let temprooms = [];

        for (const room of duplicaterooms) {
            const selectedStartDate = moment(dates[0], 'DD-MM-YYYY');
            const selectedEndDate = moment(dates[1], 'DD-MM-YYYY');

            if (isDateRangeAvailable(room, selectedStartDate, selectedEndDate)) {
                temprooms.push(room); // Add room to filtered list if available
            }
        }

        setrooms(temprooms); // Update the rooms state with available rooms
    }

    // Filter rooms by search key
    function filterBySearch() {
        const temprooms = duplicaterooms.filter(room => 
            room.name.toLowerCase().includes(searchkey.toLowerCase())
        );
        setrooms(temprooms); // Update the rooms state with the filtered rooms
    }

    // Filter rooms by type
    function filterByType(e) {
        settype(e);
        if (e !== 'all') {
            const temprooms = duplicaterooms.filter(room => 
                room.type.toLowerCase() === e.toLowerCase()
            );
            setrooms(temprooms); // Update the rooms state with the filtered rooms
        } else {
            setrooms(duplicaterooms); // Reset rooms to all available rooms
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 bs">
                <div className="col-md-3">
                    <RangePicker
                        format='DD-MM-YYYY'
                        onChange={filterByDate}
                        style={{ height: '38px', marginTop: '0px', border: "1px solid black" }}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type='text'
                        className="form-control"
                        placeholder='Search Rooms'
                        style={{ height: '38px', marginTop: '0px' }}
                        value={searchkey}
                        onChange={(e) => { setsearchkey(e.target.value); }}
                        onKeyUp={filterBySearch}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        style={{ border: '1px solid black' }}
                        value={type}
                        onChange={(e) => { filterByType(e.target.value); }}
                    >
                        <option value="all">All Rooms</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error />
                ) : (
                    <div className="row">
                        {rooms.map(room => (
                            <div key={room._id}>
                                <Room room={room} fromdate={fromdate} todate={todate} /> {/* Render the Room component for each room */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Homescreen;
