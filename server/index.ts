import path from 'path';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { staticRouter, messageRouter } from './routes';
import messageErrorHandler from './middleware/messageErrorHandler';

dotenv.config();

const app = express()

const port = process.env.PORT

const apiVersion = process.env.API_VERSION;

staticRouter(path.join(__dirname, '../public'), app);

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.use(`/api/${apiVersion}/messages`, messageRouter());

app.use(messageErrorHandler);

app.listen(port, () => {
  console.log(`Playground listening on port ${port}`)
})