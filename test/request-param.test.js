import express from 'express';
import request from 'supertest';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports : [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

test('Request',async () => {
  const app = express();
  app.get('/',  (req, res) => {
    res.send(`Hai, ${req.query.firsname} ${req.query.lastname}`);

  });
  const response = await request(app).get('/').query({firsname: "dimas", lastname: "dimas"});
  expect(response.text).toBe('Hai, dimas dimas');
  logger.info(`${new Date()} ${response.text}`)
});
