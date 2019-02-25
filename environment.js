module.exports = {
  PORT: process.env.PORT || 3000,
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost/atrasos-api',
  ACCESS_KEY: process.env.ACCESS_KEY || 'dummy_key',
};
