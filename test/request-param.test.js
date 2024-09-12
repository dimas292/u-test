import express from 'express';
import request from 'supertest';


test('Request', () => {
  const app = express();
  app.get('/', async (req, res) => {
    res.send(`Hai, ${req.query.firsname} ${req.query.lastname}`);

    const response = await request(app).get('/').query({firsname: "dimas", lastname: "dimas"});
    expect(response.text).toBe('Hai, dimas dimas');
  });
});
