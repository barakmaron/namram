import SparePartsService from '../services/Products/SparePartsService.js';
import HtmlService from '../services/PdfServices/index.js'
import SendMail, { OutOfStockPartMailOption, ContactMailOption, ScheduledServicesMailOptions } from '../services/MailService.js';
import ScheduledService from '../services/Products/ScheduledService.js';

async function SendOutOfStockPartsJob() {
    try {
        const out_of_stock_parts = await SparePartsService.GetOutOfStockParts();
        const object_for_html = await Promise.all(out_of_stock_parts.map(part => HtmlService.ParseDbObject(part)));
        const parsed_html = await HtmlService.CreateSparePartOutOfStockHtml(object_for_html);
        const mail_params = OutOfStockPartMailOption(parsed_html);
        return SendMail(mail_params);
    } catch (err) {
        throw err;
    }
}

async function SendContactForm(data) {
   try { 
    const parsed_html = await HtmlService.CreateContactHtml(data);
    const mail_params = ContactMailOption(parsed_html);
    return SendMail(mail_params);
   } catch (err) {
    throw err;
   }
}

async function SendRequiredService() {
    try {
        const services = await ScheduledService.RequiredServices();
        const products_promise = Promise.all(services.map((service) => HtmlService.ParseDbObject(service.Product)));
        const services_promise = Promise.all(services.map((service) => HtmlService.ParseDbObject(service.Service)));   
        const [parsed_products, parsed_service] = await Promise.all([products_promise, services_promise]);
        const object_for_html = services.map((service, index) => ({
            product: parsed_products[index],
            service: parsed_service[index],
            ...service
        }));
        const parsed_html = await HtmlService.CreateServiceHtml(object_for_html);
        const mail_params = ScheduledServicesMailOptions(parsed_html);
        return SendMail(mail_params);
    } catch (err) {
        console.log(err);
    }
}

const MailerController = {
    SendOutOfStockPartsJob,
    SendContactForm,
    SendRequiredService
};

export default MailerController;