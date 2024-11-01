const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({ path: './secret.env' });
var ACCESS_KEY = process.env.EDUFLYS3_ACCESS_KEY_ID
var SECRET_ACCESS_KEY = process.env.EDUFLYS3_SECRET_ACCESS_KEY_ID

// Configure AWS with IAM credentials
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'  // e.g., 'us-east-1'
});

const s3 = new AWS.S3();
const bucketName = 'edufly';

// Function to upload a file to S3
function uploadFile(filePath, studentId, fileName) {
  const fileStream = fs.createReadStream(filePath);
  const s3Params = {
    Bucket: bucketName,
    Key: `submissions/${studentId}/${fileName}`,
    Body: fileStream,
  };

  s3.upload(s3Params, (err, data) => {
    if (err) {
      console.error("Error uploading file:", err);
    } else {
      console.log("File uploaded successfully:", data.Location);
    }
  });
}

// Example usage
// uploadFile('./path/to/file.pdf', 'student123', 'assignment1.pdf');

// Function to list all files for a specific student
function listFiles(studentId) {
  const s3Params = {
    Bucket: bucketName,
    Prefix: `submissions/${studentId}/`,
  };

  s3.listObjectsV2(s3Params, (err, data) => {
    if (err) {
      console.error("Error listing files:", err);
    } else {
      data.Contents.forEach((item) => {
        console.log(`File: ${item.Key} (Size: ${item.Size})`);
      });
    }
  });
}

// Example usage
// listFiles('student123');