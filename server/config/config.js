require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'weedmates_db',
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'weedmates_db',
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: 'mysql'
  }
}