const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// IMPORTANT: express.json() doit être AVANT le middleware de logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Middleware de logging
app.use((req, res, next) => {
    console.log(`[User Service] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Routes
const authentificationRoutes = require('./routes/authentification');
app.use('/', authentificationRoutes);

// Connexion MongoDB
mongoose.connect(process.env.USER_MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.USER_SERVICE_PORT || 4001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));