import cron from 'node-cron';
import MailerController from './MailerController.js';

function ScheduleOutOfStock() {
    cron.schedule('5 8 * * 0', MailerController.SendOutOfStockPartsJob); // run every sunday 08:05
    console.log('Cron Jobs: Spare part job is up');
}

const CronJobsController = {
    ScheduleOutOfStock
};

export default CronJobsController;