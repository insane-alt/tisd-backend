const { User, Mentor, Student } = require('../models');

// Create new mentor
exports.createMentor = async (req, res) => {
  try {
    const { username, email, password, department, designation, expertise, maxStudents } = req.body;

    // Create user first
    const user = await User.create({
      username,
      email,
      password,
      userType: 'mentor'
    });

    // Create mentor profile
    const mentor = await Mentor.create({
      userId: user.id,
      department,
      designation,
      expertise,
      maxStudents: maxStudents || 5,
      currentStudents: 0
    });

    res.status(201).json({ user, mentor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: Student,
          include: [{
            model: User,
            attributes: { exclude: ['password'] }
          }]
        }
      ]
    });

    res.json(mentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get mentor's students
exports.getMentorStudents = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const mentor = await Mentor.findByPk(mentorId, {
      include: [{
        model: Student,
        include: [{
          model: User,
          attributes: { exclude: ['password'] }
        }]
      }]
    });

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json(mentor.Students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update mentor's capacity
exports.updateCapacity = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { maxStudents } = req.body;

    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    if (maxStudents < mentor.currentStudents) {
      return res.status(400).json({ message: 'Cannot set capacity below current student count' });
    }

    mentor.maxStudents = maxStudents;
    await mentor.save();

    res.json({ message: 'Mentor capacity updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 