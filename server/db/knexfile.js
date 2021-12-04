// Update with your config settings.
const path = require("path");

// require('dotenv').config({path: '../../'});

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.DB_LOCAL_HOST,
      database: process.env.DB_LOCAL_NAME,
      user: process.env.DB_LOCAL_USER,
      password: process.env.DB_LOCAL_PASS,
    },
    pool: {
      min: 2,
      max: 10,
    },
    // migrations: {
    //   tableName: 'knex_migrations'
    // },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
  },
};
