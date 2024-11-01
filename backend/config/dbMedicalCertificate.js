const mongoose = require('mongoose');

const connectMedicalCertificateDB = () => {
    return new Promise((resolve, reject) => {
        const connection = mongoose.createConnection(
            'mongodb+srv://username:leandro123_1010xX@cluster0.jb9a0.mongodb.net/medical_certificate_db?retryWrites=true&w=majority'
        );

        connection.once('open', () => {
            console.log('Connected to Medical Certificate Database on MongoDB Atlas');
            resolve(connection);
        });

        connection.on('error', (err) => {
            console.error('Error connecting to Medical Certificate Database:', err.message);
            reject(err);
        });
    });
};

module.exports = connectMedicalCertificateDB;
