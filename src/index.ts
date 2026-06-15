import 'dotenv/config';
import './db/connectToDb';

import cors from 'cors';
import express, { type Application } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:5127',
  }),
);

app.listen(process.env.PORT || 3000, (): void => {
  console.log(`Api escuchando en el puerto ${process.env.PORT || 3000}`);
});
