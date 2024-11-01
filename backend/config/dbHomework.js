const mongoose = require('mongoose');

const connectHomeworkDB = () => {
    return new Promise((resolve, reject) => {
        const connection = mongoose.createConnection(
            'mongodb+srv://username:leandro123_1010xX@cluster0.jb9a0.mongodb.net/homework_db?retryWrites=true&w=majority'
        );

        connection.once('open', () => {
            console.log('Connected to Homework Database on MongoDB Atlas');
            resolve(connection);
        });

        connection.on('error', (err) => {
            console.error('Error connecting to Homework Database:', err.message);
            reject(err);
        });
    });
};

module.exports = connectHomeworkDB;
