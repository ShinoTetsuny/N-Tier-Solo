const Publication = require('../models/publication');

// Créer une publication
exports.createPublication = async (req, res) => {
    console.log('Creating publication:', req.body);
    try {
        const { title, content } = req.body;
        const publication = await Publication.create({
            title,
            content,
        });

        console.log('Publication created:', publication);
        res.status(201).json({
            success: true,
            data: publication
        });
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Récupérer toutes les publications
exports.getPublications = async (req, res) => {
    console.log('Getting all publications');
    try {
        const publications = await Publication.find()
            .sort({ createdAt: -1 });

        console.log('Publications found:', publications.length);
        res.status(200).json({
            success: true,
            data: publications
        });
    } catch (error) {
        console.error('Error getting publications:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Récupérer une publication par ID
exports.getPublicationById = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Mettre à jour une publication
exports.updatePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedPublication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Supprimer une publication
exports.deletePublication = async (req, res) => {
    try {
        const publication = await Publication.findById(req.params.id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: 'Publication not found'
            });
        }

        await publication.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Publication deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}; 