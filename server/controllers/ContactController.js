import ContactService from "../services/ContactService.js";
import { StatusCode } from 'status-code-enum';

async function SendForm(req, res, next) {
    try {
        const { company_name, email, full_name, phone_number, text } = req.body;
        await ContactService.SendForm(company_name, email, full_name, phone_number, text);
        return res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        next(err);
    }
}

const ContactController = {
    SendForm
};

export default ContactController;