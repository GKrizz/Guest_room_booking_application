

# Room Booking Application

This guide will walk you through setting up and developing the Room Booking Application using React, Node.js, and MongoDB. Follow these steps to get started.

## Table of Contents

1. [Frontend Setup](#frontend-setup)
2. [Navbar Component](#navbar-component)
3. [Backend Setup](#backend-setup)
4. [Database Configuration](#database-configuration)
5. [Creating Models](#creating-models)
6. [API Integration](#api-integration)
7. [Frontend-Backend Connection](#frontend-backend-connection)
8. [Additional Features](#additional-features)
9. [Authentication](#authentication)
10. [Booking Functionality](#booking-functionality)
11. [Payment Gateway Integration](#payment-gateway-integration)
12. [Search and Filtering](#search-and-filtering)
13. [Profile and Booking Management](#profile-and-booking-management)
14. [Admin Panel](#admin-panel)

## Frontend Setup

1. **Create React Application**

   ```bash
   npx create-react-app client
   cd client
   npm start
   ```

2. **Install Dependencies**

   - React Router and Axios for routing and API operations:
     ```bash
     npm install react-router-dom axios
     ```
   - React Bootstrap for UI components:
     ```bash
     npm install react-bootstrap
     ```

## Navbar Component

1. **Create Navbar Component**

   - Create `src/components/Navbar.js`.
   - Use Bootstrap and React Bootstrap for styling.

## Backend Setup

1. **Initialize Node.js Project**

   ```bash
   mkdir server
   cd server
   npm init -y
   ```

2. **Install Express**

   ```bash
   npm install express
   ```

3. **Create Entry Point**

   - Create `server.js`.
   - Start server with:
     ```bash
     node server.js
     ```
   - For automatic server restarts, install and use Nodemon:
     ```bash
     npm install nodemon --save-dev
     npx nodemon server.js
     ```

## Database Configuration

1. **Set Up MongoDB**

   - Download MongoDB Compass.
   - Create a new database and collections.

2. **Install Mongoose**

   ```bash
   npm install mongoose
   ```

3. **Configure Database**

   - Create `server/db.js` for database configuration.

## Creating Models

1. **Room Model**

   - Create `models/room.js`:
     - Define schema and model for rooms using Mongoose.

2. **Add Static Data**

   - Add initial data to the Room collection.

## API Integration

1. **Set Up Express Router**

   - Install Express Router:
     ```bash
     npm install express-router
     ```
   - Create `routes/roomsRoute.js` for room-related endpoints.

2. **Test API Endpoints**

   - Use Postman to verify API connectivity.

## Frontend-Backend Connection

1. **Configure Proxy**

   - Add proxy to `client/package.json`:
     ```json
     "proxy": "http://localhost:5000/"
     ```

2. **Create Home Screen**

   - Create `src/screens/Homescreen.js`.
   - Install additional packages if needed.

## Additional Features

1. **Create Components**

   - Create `src/components/Room.js` and `src/screens/Bookingscreen.js`.

2. **Error, Success, and Loading Components**

   - Create components in `src/components` and use Bootstrap alerts.

## Authentication

1. **Create User Model**

   - Create `models/user.js` for user management.

2. **Set Up Authentication Endpoints**

   - Add registration and login endpoints in `routes/authRoutes.js`.

3. **Frontend Integration**

   - Create registration and login screens.
   - Update routes in `src/App.js`.

4. **Update Navbar**

   - Display user status and name based on login.

## Booking Functionality

1. **Calendar Integration**

   - Install Ant Design and Moment.js:
     ```bash
     npm install antd moment
     ```
   - Implement date selection and booking logic.

2. **Create Booking Model**

   - Create `models/booking.js` and `routes/bookingsRoute.js`.

3. **Handle Room Availability**

   - Filter out booked rooms based on selected dates.

## Payment Gateway Integration

1. **Set Up Stripe**

   - Install Stripe packages:
     ```bash
     npm install react-stripe-checkout stripe uuid sweetalert2
     ```
   - Configure Stripe in `src/screens/Bookingscreen.js` and backend routes.

2. **Style Payment Gateway**

   - Customize payment UI and handle transactions.

## Search and Filtering

1. **Implement Search and Filtering**

   - Add search and filtering options for room types (e.g., deluxe, non-deluxe).

## Profile and Booking Management

1. **Create Profile Screen**

   - Create `src/screens/Profilescreen.js` for managing bookings and cancellations.

2. **Handle Booking Cancellations**

   - Add cancel booking functionality and update room availability.

## Admin Panel

1. **Create Admin Screen**

   - Create `src/screens/Adminscreen.js` for admin functionalities.
   - Include options to manage bookings, rooms, and users.

2. **Implement Admin Logic**

   - Add necessary logic in `routes/adminRoutes.js` and `Adminscreen.js`.
