const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authMiddleware, userController.getProfile);

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/me', authMiddleware, userController.updateProfile);

// @route   DELETE /api/users/me
// @desc    Delete current user account
// @access  Private
router.delete('/me', authMiddleware, userController.deleteAccount);

module.exports = router;
