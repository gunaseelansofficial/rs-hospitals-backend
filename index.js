const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Optimization
app.use(helmet());
app.use(compression());
app.use(morgan('combined')); // Production logging

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { message: "Too many requests, please try again later." }
});
app.use('/api/', limiter);

// Middleware
app.use(cors({
    origin: [
        'https://www.rshospitals.co.in',
        'https://rshospitals.co.in',
        'http://localhost:5173', // Vite default
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/services', require('./routes/services'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/contacts', require('./routes/contacts'));

// Status Route
app.get('/status', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Default API Route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to RS Hospitals API backend!" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('❌ Global Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal Server Error' 
            : err.message
    });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
