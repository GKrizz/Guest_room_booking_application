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

    const [searchkey,setsearchkey]=useState('');
    const [type,settype]=useState('all')


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

    function filterByDate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
        settodate(moment(dates[1]).format('DD-MM-YYYY'));

        let temprooms = [];
        let availability = false;
        
        for (const room of duplicaterooms) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    if (
                        !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate) &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                    ) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            availability = true;
                        }
                    }
                }
            }
            if (availability === true || room.currentbookings.length === 0) {
                temprooms.push(room);
            }
            setrooms(temprooms);
        }
    }

    function filterBySearch(){
        const temprooms =duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))

        setrooms(temprooms)
        
    }
    function filterByType(e){
        settype(e)
        if(e!=='all'){
            const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
            setrooms(temprooms)
        }
        else{
            setrooms(duplicaterooms)
        }
    }
    return (
        <div className="container">
            <div className="row mt-5 bs">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} style={{height: '38px',marginTop:'0px',border:"1px solid black"}}/>
                </div>
                <div className="col-md-4">
                    <input 
                        type='text' 
                        className="form-control" 
                        placeholder='Search Rooms'
                        style={{ height: '38px',marginTop:'0px' }}
                        value={searchkey}
                        onChange={(e)=>{setsearchkey(e.target.value)}}
                        onKeyUp={filterBySearch}
                    />
                </div>
                <div className="col-md-4">
                    <select className="form-control" style={{border:'1px solid black'}} value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                        <option value="all">All Rooms</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (<Loader />) :  (
                    <div className="row">
                        {rooms.map(room => (
                            <div key={room._id}>
                                <Room room={room} fromdate={fromdate} todate={todate}/> {/* Render the Room component for each room */}
                            </div>
                        ))}
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default Homescreen;
