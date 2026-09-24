const express = require('express');
const app = express();
const urlRoutes = require('./routes/url.js');
const connectToMongoDB = require('./connect.js');
const URL = require('./models/url.js');

const PORT = 3000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(()=>{
    console.log('Connected to MongoDB');
});
app.use(express.json());
app.use('/url', urlRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});