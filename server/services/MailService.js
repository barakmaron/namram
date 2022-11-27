import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const mailOption = (from, full_name, phone_number, date) => ({
    from,
    to: process.env.EMAIL_ADMIN,
    subject: date ? "New Calendar event!!" : "New contact form!!",
    text: `name: ${full_name}\nphone: ${phone_number}\nemail: ${from}\ndate:${date || new Date()}`
});

export const OutOfStockPartMailOption = (prase_mail) => ({
    to: process.env.EMAIL_ADMIN,
    subject: "Namram | Parts Out Of Stock",
    html: prase_mail
});

const SendMail = (mail_params) => transporter.sendMail(mail_params, (error, info) => {
    info && console.log("Email was sent successfully");
    if(error)
        throw error;
});

export default SendMail;