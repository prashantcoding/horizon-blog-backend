const { Sequelize } = require('sequelize');

// PostgreSQL connection setup using a Render URL
const url=process.env.DB_URL
const db = new Sequelize(url, {
    dialect: 'postgres', // Set to 'postgres' for PostgreSQL
    logging: false, 
    dialectOptions: {
        ssl: {
            require: true, // Enforce SSL connection
            rejectUnauthorized: false // Allow self-signed certificates
        }
    }
});

async function authenticateDB() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

authenticateDB();

module.exports = db;
