import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import ErrorHandler from './middleware/ErrorHandler.js';
import ValidationErrorMiddleware from './middleware/ValidationErrorMiddleware.js';
import { sequelize } from './db/models/index.js';
import ExpressCache from 'express-cache-middleware';
import cacheManager from 'cache-manager';
import path from 'path';
import { fileURLToPath } from 'url';
import RunSeed from './db/seeders/users_seed.js'
import CronJobsController from './controllers/CronJobsController.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

Promise.resolve(sequelize.sync({  })).then(() => {
  const queryInterface = sequelize.getQueryInterface();
  RunSeed(queryInterface, sequelize);
});

Promise.resolve(CronJobsController.ScheduleOutOfStock());

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: 'memory', 
    max: 10000, 
    ttl: 3600
  })
);

const app = express();
app.use(cookieParser());
app.use([morgan("common"), cors({ origin:true, credentials: true }), express.json(), express.urlencoded()]);

app.use('/', routes);
app.use(ValidationErrorMiddleware);
app.use(ErrorHandler);
cacheMiddleware.attach(app);
app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build/')});
});

export default app;