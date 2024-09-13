import express from 'express';
import request from 'supertest';


test('used regex path', async() => {
  const app = express();
  app.get('/products/:id(\\d+)',  (req, res) => {
    res.send(`${req.params.id}`);
  
  });
  app.get('/categories/*(\\d+).json',  (req, res) => {
    res.send(`${req.originalUrl}`);
  
  });

  let response = await request(app).get('/products/1')
  expect(response.text).toBe('1');

  response = await request(app).get('/categories/1.json')
  expect(response.text).toBe('/categories/1.json');
});
