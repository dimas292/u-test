import express from "express";
import request from 'supertest';


test('Request', async() => {
  const app = express()
  app.get('/hello/world', (req, res) => {
    res.send({
      path: req.path,
      query: req.originalUrl,
      hostname: req.hostname,
      protocol: req.protocol
    })
  })

  const response = await request(app).get('/hello/world').query({name: 'World'})
  expect(response.body).toEqual({
    path: '/hello/world',
    query: '/hello/world?name=World',
    hostname: '127.0.0.1',
    protocol: 'http'
  })
  })
