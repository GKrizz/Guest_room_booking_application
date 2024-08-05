import React, { useState } from 'react';
import { Modal, Button, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Room({ room,fromdate,todate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-md-12 my-3">
      <Card className="shadow-sm border-2">
        <div className="row no-gutters">
          <div className="col-md-4">
            <Card.Img 
              src={room.imageurls[0]} 
              alt={room.name} 
              className="img-fluid rounded-left" 
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <Card.Body className="d-flex flex-column">
              <Card.Title style={{ fontSize: '1.5rem' }}>{room.name}</Card.Title>
              <Card.Text className="text-muted" style={{ fontSize: '1rem' }}>
                <b>Description :</b> {room.description}<br />
                <b>Location :</b> {room.location}<br />
                <b>Max Count:</b> {room.maxcount}<br />
                <b>Phone Number:</b> {room.phonenumber}<br />
                <b>Type:</b> {room.type}
              </Card.Text>

              <div className="mt-auto text-right">

                {(fromdate && todate)&&(
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                      <button className="btn btn-primary m-2">Book now</button>
                    </Link>
                )}
                
                <Button className="btn btn-primary" onClick={handleShow}>View Details</Button>
              </div>
              
            </Card.Body>
          </div>
        </div>
      </Card>

      {/* Modal for room details */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{room.name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* Carousel to display room images */}
          <Carousel>
            {room.imageurls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`${room.name} image ${index + 1}`}
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p><b>Description:</b> {room.description}</p>
          <p><b>Max Count:</b> {room.maxcount}</p>
          <p><b>Phone Number:</b> {room.phonenumber}</p>
          <p><b>Type:</b> {room.type}</p>

          {/* Add other relevant details if needed */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
