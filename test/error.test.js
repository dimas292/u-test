import express from 'express';
import request from 'supertest';

test('error handling', async() => {
  const app = express();
  app.get('/',  (req, res) => {
    throw new Error("ups")
  
  });
  app.use(errorHandlingMiddleware)
  let response = await request(app).get('/')
  expect(response.status).toBe(500)
  expect(response.text).toBe('Terjadi Error : ups')
});

const errorHandlingMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error : ${err.message}`)
}
