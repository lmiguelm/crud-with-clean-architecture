import createConnection from '../../infra/typeorm';
createConnection();

import cors from 'cors';

import { routes } from './routes';

import express from 'express';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export { app };
