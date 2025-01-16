const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const publicationRoutes = require('./routes/publicationRoutes');
app.use('/', publicationRoutes); // Pas de préfixe car la gateway s'en charge

// Connexion MongoDB
mongoose.connect(process.env.PUBLICATION_MONGODB_URI)
  .then(() => console.log('MongoDB connected for Publications'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PUBLICATION_SERVICE_PORT || 4002;
app.listen(PORT, () => console.log(`Publication service running on port ${PORT}`));