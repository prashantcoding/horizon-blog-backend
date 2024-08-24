const { Sequelize } = require('sequelize');


const db=new Sequelize('horizon_db','root','',{
    host:'localhost',
    dialect:'mysql',
    logging: false, 
}
)

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
