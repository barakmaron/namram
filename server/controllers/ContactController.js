import ContactService from "../services/ContactService.js";

async function SendForm(req, res) {
    try {
        const { company_name, email, full_name, phone_number, text } = req.body;
        await ContactService.SendForm(company_name, email, full_name, phone_number, text);
        return res.status(200).json();
    } catch (err) {
        console.log(err);
    }
}

const ContactController = {
    SendForm
};

export default ContactController;