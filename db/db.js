require('dotenv').config(); // Load .env first
const { Sequelize } = require('sequelize');

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    console.error('❌ DB_URL is not set in .env or environment variables');
    process.exit(1);
}

const db = new Sequelize(dbUrl, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
});

async function authenticateDB() {
    try {
        await db.authenticate();
        console.log('✅ Connected to PostgreSQL database successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
    }
}

authenticateDB();

module.exports = db;
