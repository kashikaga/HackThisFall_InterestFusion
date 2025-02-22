"use strict";

var winston = require('winston');

var DailyRotateFile = require('winston-daily-rotate-file');

var format = winston.format,
    transports = winston.transports,
    createLogger = winston.createLogger;
var combine = format.combine,
    timestamp = format.timestamp,
    printf = format.printf,
    colorize = format.colorize,
    errors = format.errors;
var customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
  }
};
winston.addColors(customLevels.colors);
var logFormat = printf(function (_ref) {
  var level = _ref.level,
      message = _ref.message,
      timestamp = _ref.timestamp,
      stack = _ref.stack;
  return "".concat(timestamp, " [").concat(level, "]: ").concat(stack || message);
});
var logger = createLogger({
  levels: customLevels.levels,
  format: combine(timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), errors({
    stack: true
  }), colorize(), logFormat),
  transports: [new transports.Console({
    level: 'debug',
    handleExceptions: true
  }), new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'info',
    handleExceptions: true,
    zippedArchive: true
  })],
  exitOnError: false
});
logger.stream = {
  write: function write(message) {
    logger.http(message.trim());
  }
};
module.exports = logger;
//# sourceMappingURL=logger.dev.js.map
