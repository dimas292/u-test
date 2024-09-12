import express from 'express';
import 'dotenv/config';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';


app.listen(PORT, host, () => {
  console.log('Example app listening on port :', PORT);
});