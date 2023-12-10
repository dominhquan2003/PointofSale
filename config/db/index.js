const { Sequelize } = require('sequelize');
require('dotenv').config()
                       
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ,
      dialect: 'mysql',
      logging: false,
      createdAt: false, 
      updatedAt: false,
});
const connectionDb = async () => {
      try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
      } catch (error) {
            console.error('Unable to connect to the database:', error);
      }
}
module.exports = {
      sequelize,
      connectionDb
    };
