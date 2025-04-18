const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const mentorController = require('../controllers/mentorController');

// @route   POST /api/mentors
// @desc    Create new mentor
// @access  Private (Admin only)
router.post('/', authMiddleware, mentorController.createMentor);

// @route   GET /api/mentors
// @desc    Get all mentors
// @access  Private (Admin/Student)
router.get('/', authMiddleware, mentorController.getAllMentors);

// @route   GET /api/mentors/:mentorId/students
// @desc    Get mentor's students
// @access  Private (Admin/Mentor)
router.get('/:mentorId/students', authMiddleware, mentorController.getMentorStudents);

// @route   PUT /api/mentors/:mentorId/capacity
// @desc    Update mentor's capacity
// @access  Private (Admin only)
router.put('/:mentorId/capacity', authMiddleware, mentorController.updateCapacity);

module.exports = router; 