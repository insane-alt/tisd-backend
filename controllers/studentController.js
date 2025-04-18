const { User, Student, Mentor } = require('../models');

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const { username, email, password, rollNumber, department, year, semester, mentorId } = req.body;

    // Create user first
    const user = await User.create({
      username,
      email,
      password,
      userType: 'student'
    });

    // Create student profile
    const student = await Student.create({
      userId: user.id,
      rollNumber,
      department,
      year,
      semester,
      mentorId
    });

    res.status(201).json({ user, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: Mentor,
          include: [{
            model: User,
            attributes: { exclude: ['password'] }
          }]
        }
      ]
    });

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign mentor to student
exports.assignMentor = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Check if mentor has capacity
    if (mentor.currentStudents >= mentor.maxStudents) {
      return res.status(400).json({ message: 'Mentor has reached maximum student capacity' });
    }

    student.mentorId = mentorId;
    await student.save();

    // Update mentor's current students count
    mentor.currentStudents += 1;
    await mentor.save();

    res.json({ message: 'Mentor assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 