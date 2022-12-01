import ErrorMessages from "./ErrorMessages.js";

const ContactSchema = {
    full_name: {
        isLength: {
            options: { 
                min: 4
            }
        },
        errorMessage: ErrorMessages.full_name
    },
    company_name: {
        isLength: {
            options: { 
                min: 2
            }
        },
        errorMessage: ErrorMessages.company_name
    },
    phone_number: {
        errorMessage: ErrorMessages.phone,
        isLength: {
            options: { 
                min: 10
            }
        },
    },
    email: {
        isEmail: true,        
        errorMessage: ErrorMessages.email
    }
};

export default ContactSchema;