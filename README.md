# Guest Room Booking Application - Cartrabbit

**Project Title:** Guest Room Booking Application

**Technologies Used:** 
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB Atlas


## Project Overview

**Guest Room Booking Application** is a platform designed to help house owners manage short-term rental bookings efficiently. It allows property owners to register their properties, manage room details, and set booking conditions. Customers can browse available rooms, view detailed information, and make bookings.
For a complete and detailed guide, visit the [full documentation here](https://github.com/GKrizz/Guest_room_booking_application/blob/main/client/README.md).

### Features

- **House Owners**:
  - Register an account using email and mobile number.
  - Create, edit, and delete room details.
  - Set booking periods and rent amounts.
  - Upload room photos.

- **Customers**:
  - Register an account using email and mobile number.
  - Browse available rooms and view detailed information.
  - Check room availability with a calendar.
  - Book rooms for selected dates.

## Installation Instructions

### Prerequisites

- Node.js
- MongoDB

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/GuestRoomBooking.git
   cd GuestRoomBooking
   ```

2. **Install Dependencies**:
   - Navigate to the `client` directory and install client dependencies:
     ```bash
     cd client
     npm install
     ```
   - Navigate back to the root directory and install server dependencies:
     ```bash
     cd ..
     npm install
     ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Application**:
   - Start the server:
     ```bash
     npm start
     ```
   - Start the client:
     ```bash
     cd client
     npm start
     ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Database Schema

### Tables

- **Users**:
  - `name`: String, required
  - `email`: String, required, unique
  - `password`: String, required
  - `number`: String, required
  - Timestamps

- **Rooms**:
  - `name`: String, required
  - `maxcount`: Number, required
  - `phonenumber`: Number, required
  - `rentperday`: Number, required
  - `imageurls`: Array, required
  - `currentbookings`: Array, required
  - `type`: String, required
  - `description`: String, required
  - `location`: String, required
  - Timestamps

- **Bookings**:
  - `room`: String, required
  - `roomid`: String, required
  - `userid`: String, required
  - `fromdate`: String, required
  - `todate`: String, required
  - `totalamount`: Number, required
  - `totalDays`: Number, required
  - `transactionid`: String, required
  - `status`: String, required, default 'booked'
  - `location`: String, required
  - Timestamps

## Sample Data

Sample data files are located in the `sample` directory. To load sample data into your MongoDB database:

1. **Import Data**:
   Use MongoDB's import tool to load the JSON data into your database:
   ```bash
   mongoimport --db yourdbname --collection users --file sample/users.json
   ```

2. Repeat for other collections like `rooms`, `bookings`, etc.

## Execution Instructions

1. **Run Server**:
   - In the root directory, start the server:
     ```bash
     nodemon server
     ```

2. **Run Client**:
   - In the `client` directory, start the client:
     ```bash
     npm start
     ```

3. **View Application**:
   - Navigate to `http://localhost:3000` in your web browser.

## Deployment Instructions

1. **Prepare for Deployment**:
   - Ensure all environment variables are correctly set for the production environment.
   - Create a production build of the client:
     ```bash
     cd client
     npm run build
     ```

2. **Deploying the Application**:
   - Deploy the application using services like Heroku, AWS, or DigitalOcean.
   - Deploy the server and client separately or together, based on your setup.
   - For Heroku, push the code to your Heroku app repository and set environment variables in the Heroku dashboard.

3. **Post-Deployment**:
   - Ensure the MongoDB database is accessible and properly configured with your deployment environment.
   - Test the application to ensure it functions correctly in the production environment.


