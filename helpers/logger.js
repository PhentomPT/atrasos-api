const winston = require('winston');
const env = require('../environment');

const winstonLogger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './.log/general.log' }),
  ],
});

const logger = {
  error: ($message, $meta_data = null) => winstonLogger.log('error', $message, $meta_data),
  warn: ($message, $meta_data = null) => winstonLogger.log('warn', $message, $meta_data),
  info: ($message, $meta_data = null) => winstonLogger.log('info', $message, $meta_data),
  debug: ($message, $meta_data = null) => winstonLogger.log('debug', $message, $meta_data),
};

module.exports = logger;
