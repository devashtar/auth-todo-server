import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import corsOptions from './configs/cors.options';
import routers from './router/index';
import errorMiddleware from './middlewares/error.middleware';

const app: Application = express();

app.use(express.static(path.join(__dirname, './public')));

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routers);
app.use(errorMiddleware);

export default app;