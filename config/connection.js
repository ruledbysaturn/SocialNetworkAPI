const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/social-network-api');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
