import express from 'express';
import request from 'supertest';


test('test', async() => {
  const app = express();
  app.use(express.json());
  app.post('/products', (req, res) => {
    res.send(`${req.body.name}-${req.body.npm}`);
  });
  

  let response = await request(app).post('/products').send({name: 'dimas', npm : '2370'});
  expect(response.text).toBe('dimas-2370');
});

test('requst body form', async() => {
  const app = express();
  app.use(express.urlencoded({extended: false}));
  app.post('/products', (req, res) => {
    const name = req.body.name;
    res.json({name: `${name}`});
  });
  

  let response = await request(app).post('/products').send('name=dimas');
  expect(response.body).toEqual({name: 'dimas'});
});
