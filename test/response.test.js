import express from "express";
import request from "supertest";

test("Response", async () => {
  const app = express();
  app.use(logger);
  app.use(requestTimeMiddleware)
  app.use(addPoweredHeader);
  app.use(apiKeyMiddleware);
  app.get("/", (req, res) => {
    res.send(`Hello, Today is ${req.requestTime}`);
  });

  const response = await request(app).get("/").query({apiKey : '123'});
  expect(response.text).toContain('Hello, Today is ')  
});

const logger = (req, res, next) => {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "Express");
  next();
};
const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  };
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}
// set 