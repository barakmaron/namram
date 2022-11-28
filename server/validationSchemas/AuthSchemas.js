const Login = {    
    Email: {
        isEmail: true,
        notEmpty: true,
    },
    Password: {
        notEmpty: true,
        type: "string",
        minLength: 5
    }
};

const AuthSchemas = {
    Login
};

export default AuthSchemas;