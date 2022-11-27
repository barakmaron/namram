import AuthService from '../services/AuthService.js';
import ErrorConstants from './ErrorConstants.js';

async function Login(req, res) {
    try {
        const { Email, Password } = req.body;
        const auth = await AuthService.Login(Email, Password);
        const access_token = AuthService.GenerateToken(auth);
        if(auth) {
            return res.cookie('jwt', access_token, {
                httpOnly: true
            }).sendStatus(200);
        } 
        return res.status(401).json({
            error: ErrorConstants.USER_LOGIN_ERROR
        });
    } catch (err) {
        return res.status(400).json({
            error: ErrorConstants.USER_LOGIN_ERROR
        });
    }
}

const Logout = async (req, res) => {
    try {
        res.cookie('jwt', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        })
        res.status(200).json();
    } catch (err) {
        return res.status(400).json();
    }
}

function CheckToken(req, res) {
    return res.sendStatus(200);
}

const AuthController = {
    Login,
    CheckToken,
    Logout
};

export default AuthController;