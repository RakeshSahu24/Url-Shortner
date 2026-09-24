const mongoose = require('mongoose');

const connectToMongoDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error(`MongoDB connection failed: ${error.message}`);
        throw error;
    }
}

module.exports = connectToMongoDB;