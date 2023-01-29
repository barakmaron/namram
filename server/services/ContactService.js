import MailerController from "../controllers/MailerController.js";

async function SendForm(company_name, email, full_name, phone_number, text) {
    return await MailerController.SendContactForm({
        company_name,
        email,
        full_name,
        phone_number,
        text
    });
}

const ContactService = {
    SendForm
};

export default ContactService;