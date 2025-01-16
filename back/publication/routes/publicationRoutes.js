const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
    createPublication, 
    getPublications, 
    getPublicationById, 
    updatePublication, 
    deletePublication 
} = require('../controllers/publicationController');

// Routes publiques
router.get('/', getPublications);
router.get('/:id', getPublicationById);

// Routes protégées
router.post('/', auth, createPublication);
router.put('/:id', auth, updatePublication);
router.delete('/:id', auth, deletePublication);

module.exports = router; 