import winston from "winston";

const logger = winston.createLogger({
  info : 'info',
  transports : [
    new winston.transports.File({
      handleExceptions: true,
      filename : 'exeption.log'
    })
  ]
})

hello()