import cookieParser from 'cookie-parser';
import express from 'express';
import request from 'supertest';


test('Cookie', async() => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser('secret'))
  app.post('/',  (req, res) => {
    const name = req.body.name;
    res.cookie('Login', name, {path: '/', signed: true})
    res.send(`${name}`);
  });

  const response = await request(app).post('/').send({name: 'dimas'});
  console.info(response.get('Set-Cookie').toString())
  expect(response.get('Set-Cookie').toString()).toContain('dimas')
  expect(response.text).toBe('dimas');
});

test('signed cookie', async() => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser('secret'))
  app.get('/', (req, res) => {
    const name = req.signedCookies['Login']
    res.send(`${name}`);
  })
  
  const response = await request(app).get('/').set('Cookie', 'Login=s%3Adimas.XV3FRURDypiijAU897z%2Bl8IuJSKLER%2BkuhOWphZKrpQ')
  expect(response.text).toBe('dimas');
})

