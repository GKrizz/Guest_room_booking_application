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

To display the screenshots in a compact grid format, you can use Markdown to align the images in rows and columns. Here's how you can update the **Screenshots** section:

---
## Demo Video
**Watch the Demo Video of the application:**

[Demo Video](https://github.com/user-attachments/assets/16542309-0259-4d32-96ac-1b928be4fcd1)



## Screenshots

**Here are some screenshots of the application:**

### Home Page
![Home Page](https://github.com/user-attachments/assets/110f5ed2-7c34-40f5-9171-47ab415db044)

### Available Rooms Page
![Available Rooms Page](https://github.com/user-attachments/assets/ce18273a-393b-469b-ad1c-b111991eeefd)

### Login Page
| ![Login Page 1](https://github.com/user-attachments/assets/b89f307b-ddd5-42a2-a913-b87d883285bf) | ![Login Page 2](https://github.com/user-attachments/assets/b93be2a4-e2f6-4f2d-affa-e64ce116bb33) |
|:--:|:--:|

### Profile Page
![Profile Page](https://github.com/user-attachments/assets/07673c73-8081-4a07-818a-fd3c750496a0)

### Booking Room
| ![Booking Room 1](https://github.com/user-attachments/assets/799fe5b9-7b63-4208-98d1-d11c61710a0f) | ![Booking Room 2](https://github.com/user-attachments/assets/267f8c7e-f9ba-4273-a934-0ed70fc1892c) |
|:--:|:--:|
| ![Booking Room 3](https://github.com/user-attachments/assets/2d70571d-2108-4ae7-9612-38c1aaccca0b) | ![Booking Room 4](https://github.com/user-attachments/assets/07364476-2871-4660-b2b8-afe3bd9a2f5f) |
| ![Booking Room 5](https://github.com/user-attachments/assets/7c52eaf1-3c6e-47f7-a2e4-19e59713213e) |  |

### Transaction and Database
| ![Transaction](https://github.com/user-attachments/assets/e88225d1-0af1-40c0-93f3-96a2a0bb02da) | ![Database](https://github.com/user-attachments/assets/ecc26054-7eef-4fea-928f-a1295c9b7128) |
|:--:|:--:|

### Renting and User Details
| ![Renting Details 1](https://github.com/user-attachments/assets/c253389c-d358-4904-b1e8-60e2550f477e) | ![Renting Details 2](https://github.com/user-attachments/assets/f2813d05-4221-41fb-8412-f980682aa5ea) |
|:--:|:--:|
| ![User Details 1](https://github.com/user-attachments/assets/68a87155-12db-4ce7-ab17-ce35e506fbf1) | ![User Details 2](https://github.com/user-attachments/assets/cbc7857b-1cba-4806-83fe-275689806ea0) |

---





## Contact Information

- **GitHub Repository URL:** [Guest Room Booking Application](https://github.com/GKrizz/Guest_room_booking_application.git)
- **Name:** Gobala Krishnan
- **Email Address:** kbaskarankbaskaran72@gmail.com
- **Phone Number:** +91 9345720171

--- 










