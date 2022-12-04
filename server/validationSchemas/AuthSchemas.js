import ErrorMessages from "./ErrorMessages.js";

const Login = {    
    Email: {
        isEmail: true,
        errorMessage: ErrorMessages.login
    },
    Password: {
        isLength: {
            options: { 
                min: 5
            }
        },
        errorMessage: ErrorMessages.login
    }
};

const AuthSchemas = {
    Login
};

export default AuthSchemas;