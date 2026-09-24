const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/url.js');
const connectToMongoDB = require('./connect.js');

dotenv.config();

const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI || (isProduction ? undefined : 'mongodb://localhost:27017/short-url');
const allowedOrigins = [...new Set((process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean))];

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port');
}

if (isProduction && !mongoUri) {
    throw new Error('MONGODB_URI must be set when NODE_ENV=production');
}

if (isProduction && allowedOrigins.includes('*')) {
    throw new Error('CORS_ORIGIN must list allowed origins in production, not *');
}

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.get('/health', (req, res) => {
    return res.json({ status: 'ok' });
});
app.use('/url', urlRoutes);

const startServer = async () => {
    await connectToMongoDB(mongoUri);
    return app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer().catch((error) => {
    console.error(`Failed to start server: ${error.message}`);
    process.exitCode = 1;
});