import TransportStream from "winston-transport";
import winston from "winston";

test('create new transport', () => {
  

  class MyTransport extends TransportStream {

    constructor(option){
      super(option)
    }

    log(info, next){
      console.log(`${new Date()} ${info.level}: ${info.message}`)
      next()
    }
  }

  const logger = winston.createLogger({
    level : 'info',
    transports: [
      new MyTransport({

      })
    ]
  })


  logger.info('hello world')
})
