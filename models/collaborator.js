const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Collaborator = sequelize.define('Collaborator', {
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
  organization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expertise: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  projects: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  timestamps: true
});

// Set up the associations
Collaborator.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Collaborator, { foreignKey: 'userId' });

module.exports = Collaborator; 