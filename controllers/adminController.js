const { User, Admin } = require('../models');

// Create new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password, department, position, permissions } = req.body;

    // Create user first
    const user = await User.create({
      username,
      email,
      password,
      userType: 'admin'
    });

    // Create admin profile
    const admin = await Admin.create({
      userId: user.id,
      department,
      position,
      permissions: permissions || {
        canManageUsers: true,
        canManageContent: true,
        canManageSettings: true
      }
    });

    res.status(201).json({ user, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      }]
    });

    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update admin permissions
exports.updatePermissions = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { permissions } = req.body;

    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    admin.permissions = permissions;
    await admin.save();

    res.json({ message: 'Permissions updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 