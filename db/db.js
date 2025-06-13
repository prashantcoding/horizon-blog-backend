require('dotenv').config();
const { Sequelize } = require('sequelize');

const isInternal = process.env.USE_INTERNAL_DB === 'true';

const db = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  port: 5432, // optional, default for Postgres
  dialectOptions: isInternal
    ? {} // No SSL needed for internal DB
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
  logging: false,
});

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
