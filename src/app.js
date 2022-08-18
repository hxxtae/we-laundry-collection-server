import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import 'express-async-errors';

import { collectionsRouter } from './router/index.js';
import { connectDB } from './db/database.js';

const app = express();

const corsOption = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
//app.use(express.urlencoded( {extended : false } ));
app.use(cookieParser());
app.use(cors(corsOption));
app.use(morgan('tiny'));

// router
app.use('/collections', collectionsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    message: error.message,
  });
});

connectDB().then(() => {
  const server = app.listen(8080);
  if (server) {
    console.log('server start');
  }
}).catch(console.error);
