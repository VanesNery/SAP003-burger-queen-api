require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "bq_api_development",
    "host": "db",
    "dialect": "postgres",
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "bq_api_test",
    "host": "db",
    "dialect": "postgres",
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  }
}