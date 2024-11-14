# EduFly-Reloaded


# BELOW IS THE README FOR THE UPLOAD AND DOWNLOADING OF DOCUMENTS
# PDF and Document Uploader with View and Download

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

### Folder Structure (TO BE UPDATED)
```
EduFly-Reloaded/
├── backend/                     # Backend logic and server configuration
│   ├── app.js                   # Main server file
│   ├── config/                  # Configuration files for databases and environment
│   │   ├── dbHomework.js        # Homework database configuration
│   │   └── dbMedicalCertificate.js  # Medical certificate database configuration
│   ├── models/                  # Data models for MongoDB collections
│   │   ├── homeworkModel.js     # Schema for homework data
│   │   └── medicalCertificateModel.js # Schema for medical certificate data
│   ├── routes/                  # API routes (define specific endpoints here)
│   ├── package.json             # Backend dependencies and scripts
│   ├── package-lock.json        # Package lock file for consistent dependencies
│   └── vercel.json              # Vercel deployment configuration
│
├── frontend/                    # Frontend files for the web application
│   ├── About_Us/                # About Us page
│   │   └── aboutUs.html         # HTML file for About Us page
│   ├── css/                     # Stylesheets for the frontend
│   │   ├── aboutUs.css          # Styles for the About Us page
│   │   ├── edustyle-navbar.css  # Navbar styles
│   │   ├── edustyle.css         # General styles for education theme
│   │   └── styles.css           # Core styles for the frontend
│   ├── img/                     # Images for the frontend
│   ├── js/                      # JavaScript files
│   ├── Login_Page/              # Login page files
│   │   ├── classroom.avif       # Classroom image for login
│   │   ├── login.html           # Login HTML file
│   │   └── login.js             # Login JavaScript functionality
│   ├── Student/                 # Student-specific pages and components
│   │   ├── Announcement/        # Announcement page
│   │   │   └── Announcement_Page.html # HTML file for announcements
│   │   ├── Consultation/        # Consultation booking page
│   │   │   └── student_consultation.html # HTML for consultation
│   │   ├── Homepage/            # Student dashboard and main homepage
│   │   ├── Homework_Tracker/    # Homework tracking page
│   │   ├── Medical/             # Medical certificate upload
│   │   ├── Pomodoro_Timer/      # Pomodoro timer feature
│   │   ├── Summary/             # Summary page for student progress
│   │   └── Timetable/           # Timetable page for students
│   ├── Teacher/                 # Teacher-specific pages
│   ├── favicon.ico              # Site favicon
│   ├── index.html               # Main entry page
│   ├── upload_homework.html     # Homework upload page
│   └── upload_medical.html      # Medical certificate upload page
│
├── .gitattributes               # Git configuration for handling file attributes
├── .gitignore                   # Files and folders to ignore in Git
├── feedback.txt                 # User feedback and notes
├── package.json                 # Project dependencies and scripts
├── package-lock.json            # Lock file for dependencies
└── README.md                    # Project documentation (this file)

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
To serve the frontend files, you can use http-server or Live Server extension in Visual Studio Code.

#### Using http-server
1. Install http-server globally if you haven't already:
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

4. Open your browser and navigate to:
- Upload Homework: http://localhost:5500/upload_homework.html
- View Homework: http://localhost:5500/view_homework.html
- Upload Medical Certificate: http://localhost:5500/upload_medical.html
- View Medical Certificates: http://localhost:5500/view_medical.html

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