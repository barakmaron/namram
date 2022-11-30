import SparePartsService from '../services/Products/SparePartsService.js';
import HtmlService from '../services/PdfServices/index.js'
import SendMail, { OutOfStockPartMailOption, ContactMailOption } from '../services/MailService.js';

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

const MailerController = {
    SendOutOfStockPartsJob,
    SendContactForm
};

export default MailerController;