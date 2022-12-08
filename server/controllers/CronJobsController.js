import cron from 'node-cron';
import MailerController from './MailerController.js';

function ScheduleOutOfStock() {
    cron.schedule('0 4 * * 0', MailerController.SendOutOfStockPartsJob); // run every sunday 04:00
    console.log('Cron Jobs: Spare part job is up');
}

function ScheduleCheckScheduledServices() {
    cron.schedule('10 4 * * *', MailerController.SendRequiredService); // run every day 04:10
    console.log('Cron Jobs: Scheduled Services job is up');
}

const CronJobsController = {
    ScheduleOutOfStock,
    ScheduleCheckScheduledServices
};

export default CronJobsController;