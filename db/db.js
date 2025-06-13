require('dotenv').config();
const { Sequelize } = require('sequelize');

// Check if we're using internal DB (on Render)
const isInternal = process.env.USE_INTERNAL_DB === 'true';

// Sequelize connection options
const sequelizeOptions = {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432,
  logging: false,
  dialectOptions: isInternal
    ? {} // No SSL required for internal Render network
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false, // For self-signed Render certs
        },
      },
};

// Initialize Sequelize
const db = new Sequelize(process.env.DB_URL, sequelizeOptions);

// Test connection
(async () => {
  try {
    await db.authenticate();
    console.log('✅ Connected to PostgreSQL!');
  } catch (error) {
    console.error('❌ DB Connection failed:', error.message);
    console.error(error);
  }
})();

module.exports = db;
