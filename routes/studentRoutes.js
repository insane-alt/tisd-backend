const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const studentController = require('../controllers/studentController');

// @route   POST /api/students
// @desc    Create new student
// @access  Private (Admin only)
router.post('/', authMiddleware, studentController.createStudent);

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Admin/Mentor)
router.get('/', authMiddleware, studentController.getAllStudents);

// @route   PUT /api/students/:studentId/mentor
// @desc    Assign mentor to student
// @access  Private (Admin only)
router.put('/:studentId/mentor', authMiddleware, studentController.assignMentor);

module.exports = router; 