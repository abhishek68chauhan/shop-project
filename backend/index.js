require('dns').setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productsRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send('Backend is running successfully');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/analytics', analyticsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});