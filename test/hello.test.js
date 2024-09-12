import express from 'express';
import request from 'supertest';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

test('hello world', async() => {
  const response = await request(app).get('/');
  expect(response.text).toBe('Hello World!')
})

test('request', async() => {
  const response = await request(app).get('/').query({name: 'World!'})
  expect(response.text).toBe('Hello World!')
})
