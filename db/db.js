require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create the Sequelize instance
const db = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432, // Optional: default for Postgres
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Render uses self-signed certificates
    },
  },
  logging: false, // Set to true if you want to see SQL queries in console
});

// Test the DB connection
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Connected to PostgreSQL!");
  } catch (error) {
    console.error("❌ DB Connection failed:", error.message);
    console.error(error);
  }
})();

module.exports = db;
