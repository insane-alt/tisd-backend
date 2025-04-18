const sequelize = require('../config/db');
const User = require('./user');
const Admin = require('./admin');
const Student = require('./student');
const Mentor = require('./mentor');
const Collaborator = require('./collaborator');

// Initialize models
const models = {
  User,
  Admin,
  Student,
  Mentor,
  Collaborator
};

// Set up associations
User.hasOne(Admin, { foreignKey: 'userId' });
User.hasOne(Student, { foreignKey: 'userId' });
User.hasOne(Mentor, { foreignKey: 'userId' });
User.hasOne(Collaborator, { foreignKey: 'userId' });

Mentor.hasMany(Student, { foreignKey: 'mentorId' });
Student.belongsTo(Mentor, { foreignKey: 'mentorId' });

// Export models and sequelize instance
module.exports = {
  ...models,
  sequelize
};
