import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { authRouter } from './routes/index.js';
// import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cookieParser());

app.use('/api/users', authRouter);

// app.use(errorMiddleware);

export { app };