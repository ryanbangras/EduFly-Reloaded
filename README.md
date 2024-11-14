# EduFly-Reloaded

This project provides a full-stack application for uploading and viewing documents, specifically for homework assignments (PDF, DOC, DOCX) and medical certificates (PDF and image formats). Users can upload, view, and download documents through a web interface.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Troubleshooting](#troubleshooting)

## Features
- **File Upload**: Upload homework and medical certificate files with validation.
  - Homework: PDF, DOC, DOCX.
  - Medical Certificates: PDF, JPG, JPEG, PNG.
- **View and Download**: View PDF documents in the browser and download documents.
- **Error Handling**: Prevents upload of invalid file types.

## Tech Stack
- **Frontend**: HTML, JavaScript, Bootstrap
- **Backend**: Node.js, Express, Multer for file handling
- **Database**: Firebase for storing of user data, MongoDB Atlas for storing files and metadata

## Setup

### Prerequisites
- **Node.js**: Install Node.js (v14 or above recommended).
- **MongoDB Atlas**: Set up a MongoDB Atlas cluster and create two databases:
  - `homework_db` for homework uploads
  - `medical_certificate_db` for medical certificate uploads
- **MongoDB Database Access**: Create a user with readWrite permissions.

### Folder Structure
```
EduFly-Reloaded
├── backend
│   ├── config
│   │   ├── dbHomework.js
│   │   └── dbMedicalCertificate.js
│   ├── models
│   │   ├── homeworkModel.js
│   │   └── medicalCertificateModel.js
│   ├── node_modules
│   ├── routes
│   │   ├── homeworkRoutes.js
│   │   └── medicalCertificateRoutes.js
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   └── vercel.json
├── frontend
│   ├── About_Us
│   ├── css
│   ├── img
│   ├── js
│   ├── Login_Page
│   │   ├── classroom.avif
│   │   ├── login.html
│   │   └── login.js
│   ├── Student
│   │   ├── Announcement
│   │   ├── Consultation
│   │   ├── Homepage
│   │   ├── Homework_Tracker
│   │   ├── Medical
│   │   ├── Pomodoro_Timer
│   │   ├── Summary
│   │   ├── Timetable
│   │   └── student_navbar.css
│   ├── Teacher
│   │   ├── Academic_Dashboard
│   │   ├── Announcement
│   │   ├── Consultations
│   │   ├── Homepage
│   │   ├── Homework_Tracker
│   │   ├── Timetable
│   │   └── teacher_navbar.css
│   ├── favicon.ico
│   └── index.html
├── node_modules
├── .gitattributes
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## Environment Variables

Set up the MongoDB URI for each database in `dbHomework.js` and `dbMedicalCertificate.js`. Update these files with your MongoDB credentials:

```javascript
// dbHomework.js
const mongoose = require('mongoose');
const connectHomeworkDB = async () => {
    return mongoose.createConnection('mongodb+srv://<username>:<password>@cluster0.mongodb.net/homework_db?retryWrites=true&w=majority');
};

// dbMedicalCertificate.js
const mongoose = require('mongoose');
const connectMedicalCertificateDB = async () => {
    return mongoose.createConnection('mongodb+srv://<username>:<password>@cluster0.mongodb.net/medical_certificate_db?retryWrites=true&w=majority');
};
```

Replace `<username>`, `<password>`, and `<database>` with your MongoDB credentials.

## Running the Project

### 1. Install Dependencies

#### Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 2. Start Backend Server
Run the backend server:
```bash
node app.js
```

If setup is successful, the console should display:
```
Server running on http://localhost:5000
Connected to Homework Database on MongoDB Atlas
Connected to Medical Certificate Database on MongoDB Atlas
```

### 3. Serve the Frontend
To serve the frontend files, you can use http-server.

#### Using http-server
1. Install http-server globally:
```bash
npm install -g http-server
```

2. Navigate to the frontend directory:
```bash
cd ../frontend
```

3. Start the server:
```bash
http-server -p 5500
```

## Usage (TO BE UPDATED)


### Login Credentials:
1. Teacher Account:
- Username: `chewhuile@gmail.com`
- Password: `testing123$$`
Teacher Hui Le oversees and teaches 2 classes: 3A and 4A.

2. Student Gmail Account:
- Username: `toddlee8888@gmail.com`
- Password: `testing123$$`
Todd Lee is a student in class 3A.

## Endpoints

The backend provides the following API endpoints:

### Homework Endpoints
- **Upload Homework**: `POST /api/upload-homework`
  - Body: Form-data with `studentId`, `sectionId`, `title` and `homeworkFile` (PDF, DOC, DOCX).
- **Get All Homework**: `GET /api/homeworks`
- **View Homework by ID**: `GET /api/homeworks/:id`
  - Responds with a PDF or downloadable file.

### Medical Certificate Endpoints
- **Upload Medical Certificate**: `POST /api/upload-medical`
  - Body: Form-data with `studentId` and `certificateFile` (PDF, JPG, JPEG, PNG).
- **Get All Medical Certificates**: `GET /api/medical-certificates`
- **View Medical Certificate by ID**: `GET /api/medical-certificates/:id`
  - Responds with a PDF or downloadable file.

## Troubleshooting

### Common Errors

#### Failed to Load PDF Document:
- Ensure the backend sets the correct Content-Type headers.
- Check that files are uploaded with the correct format and encoding.

#### MongoDB Connection Issues:
- Double-check the MongoDB URI in `dbHomework.js` and `dbMedicalCertificate.js`.
- Ensure your IP is whitelisted in MongoDB Atlas.

#### Invalid File Type:
- Ensure that only allowed file types are uploaded based on frontend accept attributes and backend validation.