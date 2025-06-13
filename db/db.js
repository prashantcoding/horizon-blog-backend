require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Render uses self-signed certs
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
  }
})();

module.exports = db;
