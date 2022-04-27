import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config({ path: '../../../.env' });

const app = express()

const PORT = process.env.API_PORT

app.use(json())

app.use(urlencoded({ extended: true }))

app.use(cors())

routes(app, process.env.API_VERSION);

const server = app.listen(PORT, () => {
    console.log(`Playground listening on port ${PORT}`)
})

export {
    app,
    server
};
