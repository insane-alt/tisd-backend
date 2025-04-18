const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

// @route   POST /api/admins
// @desc    Create new admin
// @access  Private (Admin only)
router.post('/', authMiddleware, adminController.createAdmin);

// @route   GET /api/admins
// @desc    Get all admins
// @access  Private (Admin only)
router.get('/', authMiddleware, adminController.getAllAdmins);

// @route   PUT /api/admins/:adminId/permissions
// @desc    Update admin permissions
// @access  Private (Admin only)
router.put('/:adminId/permissions', authMiddleware, adminController.updatePermissions);

module.exports = router; 