const mongose = require('mongoose');

const connectToMongoDB = async (url) => {
    return mongose.connect(url);
}

module.exports = connectToMongoDB;