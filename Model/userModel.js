const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust the path to your Sequelize instance
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profilePic: {
    type: DataTypes.STRING, // URL to the profile picture
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true, // Adds `createdAt` and `updatedAt` fields
});

(async () => {
  await sequelize.sync(); // Ensure the database schema is updated
})();

module.exports = User;
