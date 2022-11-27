import UsersDB from './storage/Users.js';
import jwt from 'jsonwebtoken';
import ServiceConstants from './Constants.js';

async function Login(email, password) {
    try {
        const user = await UsersDB.FindUser(email);
        const matching_passwords = password === user.Password;
        return (matching_passwords && user.id) || undefined;
    } catch (err) {
        throw err;
    }
}

function GenerateToken(user_id) {
    const base_token = process.env.ACCESS_TOKEN;
    return jwt.sign({
        id: user_id
    }, base_token, { 
        expiresIn: ServiceConstants.TOKEN_MAX_AGE
    });
}


const AuthService = {
    Login,
    GenerateToken
};

export default AuthService;