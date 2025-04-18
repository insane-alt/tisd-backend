const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  rollNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Mentors',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Set up the associations
Student.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });

module.exports = Student; 