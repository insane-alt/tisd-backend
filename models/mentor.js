const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Mentor = sequelize.define('Mentor', {
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
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  maxStudents: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  currentStudents: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
}, {
  timestamps: true
});

// Set up the associations
Mentor.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Mentor, { foreignKey: 'userId' });

module.exports = Mentor; 