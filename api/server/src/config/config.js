require('dotenv').config();

module.exports = {
    "development": {
    "username": "postgres",
    "password": null,
    "database": "burguerqueen_dev",
    "host": "db",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "burguerqueen_test",
    "host": "db",
    "dialect": "postgres",
    "logging": false,
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
  }
}