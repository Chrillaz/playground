import path from 'path';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { staticRouter, entityRouter } from './routes';

dotenv.config();

const app = express()

const port = process.env.PORT

staticRouter(path.join(__dirname, '../public'), app);

const apiVersion = process.env.API_VERSION;

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(`/api/${apiVersion}/entities`, entityRouter(app));

app.listen(port, () => {
  console.log(`Playground listening on port ${port}`)
})