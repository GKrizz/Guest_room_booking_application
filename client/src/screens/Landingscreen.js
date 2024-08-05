import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-12 content">
        <h2 className="landing-heading">
          <i className="fas fa-bed"></i> Guest Room Booking
        </h2>
        <h1 className="landing-subheading">
          <i className="fas fa-crown"></i> Your Stay, Our Royal Service.
        </h1>
        <Link to="/home">
          <button className='btn landing-button' style={{color:'black',backgroundColor:'white'}}>
            <i className="fas fa-arrow-right"></i> Visit rooms
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
