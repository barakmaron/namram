import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import ValidationErrorMiddleware from './middleware/ValidationErrorMiddleware.js';
import { sequelize } from './db/models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

Promise.resolve(sequelize.sync({}));

const app = express();
app.use(cookieParser());
app.use([morgan("common"), cors({ origin:true, credentials: true }), express.json(), express.urlencoded()]);

app.use('/', routes);
app.use(ValidationErrorMiddleware);
app.use(ErrorHandler);

app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build/')});
});

export default app;