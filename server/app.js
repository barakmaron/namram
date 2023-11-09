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
import RunSeed from './db/seeders/users_seed.js'
import CronJobsController from './controllers/CronJobsController.js';
import EnsureSecureMiddleware from './middleware/EnsureSecureMiddleware.js';
import favicon from "serve-favicon";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename); 

Promise.resolve(sequelize.sync({  })).then(() => {
  const queryInterface = sequelize.getQueryInterface();
  RunSeed(queryInterface, sequelize);
});

Promise.resolve(CronJobsController.ScheduleOutOfStock());
Promise.resolve(CronJobsController.ScheduleCheckScheduledServices());

const app = express();

// app.use(EnsureSecureMiddleware);
app.use(favicon(path.join(__dirname, '../client/build/favicon.ico')));
app.use(cookieParser());
app.use([morgan("common"), cors({ origin:true, credentials: true }), express.json(), express.urlencoded()]);

app.use('/', routes);
app.use(ValidationErrorMiddleware);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('(/*)?', function(req, res) {
   res.sendFile('index.html', {root: path.join(__dirname, '../client/build/')});
});

app.use(ErrorHandler);
process.on('unhandledRejection', (reason, promise) => {
  console.log('Uncaught Rejection', reason.message);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log("Uncaught Exception", error.message);
  process.exit(1);
});

export default app;
