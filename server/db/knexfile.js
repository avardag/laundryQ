// Update with your config settings.
const path = require("path");
const types = require("pg").types;
const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;
types.setTypeParser(TIMESTAMPTZ_OID, (val) => val);
types.setTypeParser(TIMESTAMP_OID, (val) => val);
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
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, "./migrations"),
    },
  },
};
