const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust the path to your Sequelize instance
const { v4: uuidv4 } = require('uuid');
const User = require('./userModel'); // Adjust the path to your User model

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, // HTML content can be stored in a TEXT field
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING, // URL to the cover image
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID, // UUID type for the foreign key
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true, // Adds `createdAt` and `updatedAt` fields
});

// Associations
User.hasMany(Blog, {
  foreignKey: 'userId',
  as: 'blogs',
});

Blog.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

(async () => {
  await sequelize.sync(); // Ensure the database schema is updated
})();

module.exports = Blog;
