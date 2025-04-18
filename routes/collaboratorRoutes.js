const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const collaboratorController = require('../controllers/collaboratorController');

// @route   POST /api/collaborators
// @desc    Create new collaborator
// @access  Private (Admin only)
router.post('/', authMiddleware, collaboratorController.createCollaborator);

// @route   GET /api/collaborators
// @desc    Get all collaborators
// @access  Private (Admin/Mentor)
router.get('/', authMiddleware, collaboratorController.getAllCollaborators);

// @route   PUT /api/collaborators/:collaboratorId/projects
// @desc    Update collaborator's projects
// @access  Private (Admin/Collaborator)
router.put('/:collaboratorId/projects', authMiddleware, collaboratorController.updateProjects);

// @route   POST /api/collaborators/:collaboratorId/projects
// @desc    Add project to collaborator
// @access  Private (Admin/Collaborator)
router.post('/:collaboratorId/projects', authMiddleware, collaboratorController.addProject);

module.exports = router; 