import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/index.js';
import ValidationErrorMiddleware from './middleware/ValidationErrorMiddleware.js';
import { sequelize } from './db/models/index.js';
import RunSeed from './db/seeders/users_seed.js';
import CronJobsController from './controllers/CronJobsController.js';

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

app.use([
  cookieParser(),
  morgan("common"),
  cors({ origin: true, credentials: true }),
  express.json({ limit: '100mb' }),
  express.urlencoded({ extended: false, limit: '100mb' }),
]);

app.use('/', routes);
app.use(ValidationErrorMiddleware);

app.use('/login_control_panel/', express.static(path.join(__dirname, '../control_panel/build')));
app.use('/', express.static(path.join(__dirname, '../company_site/build/')));

app.get('/login_control_panel', (req, res) => {
  res.sendFile(path.join(__dirname, '../control_panel/build', 'index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../company_site/build', 'index.html'));
});

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
