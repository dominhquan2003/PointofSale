require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "dialect": "mysql",
    "logging":false
  },
  "test": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "logging":false 
  },
  "production": {
    "username": process.env.DB_PRODUCTION_NAME,
    "password": process.env.DB_PRODUCTION_USERNAME,
    "database": process.env.DB_PRODUCTION_PASSWORD,
    "host": process.env.DB_PRODUCTION_HOST,
    "dialect": "mysql"
  }
};