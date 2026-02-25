# HRMS Lite – Backend

## 📌 Project Overview

This repository contains the backend for **HRMS Lite**, a lightweight Human Resource Management System built to manage employee records and track daily attendance.

The backend provides clean, RESTful APIs for:

- Creating new employees
- Viewing all employees
- Deleting employees
- Marking attendance (Present / Absent)
- Retrieving attendance history per employee

The focus of this project is clean API design, proper validation, structured error handling, and production-ready practices.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS

---

## 📡 API Endpoints

### Employee Routes

- `POST /employees` – Add a new employee  
- `GET /employees` – Retrieve all employees  
- `DELETE /employees/:id` – Delete an employee  

### Attendance Routes

- `POST /attendance` – Mark attendance  
- `GET /attendance/:employeeId` – Retrieve attendance history  

---

## 🔐 Validation & Error Handling

This backend includes:

- Required field validation
- Email format validation
- Unique employee ID enforcement
- Unique employee email enforcement
- Prevention of duplicate attendance for the same employee on the same date
- Proper HTTP status codes:
  - 400 → Bad Request
  - 404 → Not Found
  - 409 → Conflict
  - 500 → Server Error

---

## 🚀 Running the Backend Locally

1️⃣ Clone the Repository

```bash
git clone <your-backend-repo-url>

2️⃣ Navigate to the Project Folder

cd hrms-lite-backend

3️⃣ Install Dependencies

npm install

4️⃣ Create a .env File

Create a .env file in the root directory and add:

MONGO_URI=your_mongodb_connection_string

5️⃣ Start the Server

For development:

npm run dev

Or for production:

npm start

The server will run on:

http://localhost:5000
