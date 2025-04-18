const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 30], // Username must be 3-30 chars
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Password must be 6+ chars
    },
  },
  userType: {
    type: DataTypes.ENUM('admin', 'student', 'mentor', 'collaborator'),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
  defaultScope: {
    attributes: { exclude: ['password'] }, // Excludes password by default
  },
  scopes: {
    withPassword: {
      attributes: { include: ['password'] }, // Use when password is needed
    },
  },
});

// Instance method to validate password
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to find a user by email (useful for login)
User.findByEmail = async function (email) {
  return await this.findOne({ where: { email } });
};

module.exports = User;
