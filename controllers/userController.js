const { User, Admin, Student, Mentor, Collaborator } = require('../models');

// Get user profile based on userType
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile;
    switch (user.userType) {
      case 'admin':
        profile = await Admin.findOne({ where: { userId: user.id } });
        break;
      case 'student':
        profile = await Student.findOne({ where: { userId: user.id } });
        break;
      case 'mentor':
        profile = await Mentor.findOne({ where: { userId: user.id } });
        break;
      case 'collaborator':
        profile = await Collaborator.findOne({ where: { userId: user.id } });
        break;
    }

    res.json({ user, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;

    await user.save();

    // Update specific profile based on userType
    let profile;
    switch (user.userType) {
      case 'admin':
        profile = await Admin.findOne({ where: { userId: user.id } });
        if (profile) {
          if (req.body.department) profile.department = req.body.department;
          if (req.body.position) profile.position = req.body.position;
          if (req.body.permissions) profile.permissions = req.body.permissions;
          await profile.save();
        }
        break;
      case 'student':
        profile = await Student.findOne({ where: { userId: user.id } });
        if (profile) {
          if (req.body.rollNumber) profile.rollNumber = req.body.rollNumber;
          if (req.body.department) profile.department = req.body.department;
          if (req.body.year) profile.year = req.body.year;
          if (req.body.semester) profile.semester = req.body.semester;
          if (req.body.mentorId) profile.mentorId = req.body.mentorId;
          await profile.save();
        }
        break;
      case 'mentor':
        profile = await Mentor.findOne({ where: { userId: user.id } });
        if (profile) {
          if (req.body.department) profile.department = req.body.department;
          if (req.body.designation) profile.designation = req.body.designation;
          if (req.body.expertise) profile.expertise = req.body.expertise;
          if (req.body.maxStudents) profile.maxStudents = req.body.maxStudents;
          await profile.save();
        }
        break;
      case 'collaborator':
        profile = await Collaborator.findOne({ where: { userId: user.id } });
        if (profile) {
          if (req.body.organization) profile.organization = req.body.organization;
          if (req.body.role) profile.role = req.body.role;
          if (req.body.expertise) profile.expertise = req.body.expertise;
          if (req.body.projects) profile.projects = req.body.projects;
          await profile.save();
        }
        break;
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete specific profile based on userType
    switch (user.userType) {
      case 'admin':
        await Admin.destroy({ where: { userId: user.id } });
        break;
      case 'student':
        await Student.destroy({ where: { userId: user.id } });
        break;
      case 'mentor':
        await Mentor.destroy({ where: { userId: user.id } });
        break;
      case 'collaborator':
        await Collaborator.destroy({ where: { userId: user.id } });
        break;
    }

    // Delete user
    await user.destroy();
    
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
