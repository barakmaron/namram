import AuthService from '../services/AuthService.js';
import ErrorConstants from './ErrorConstants.js';
import { StatusCode } from 'status-code-enum';

async function Login(req, res, next) {
    try {
        const { Email, Password } = req.body;
        const auth = await AuthService.Login(Email, Password);
        const access_token = AuthService.GenerateToken(auth);
        if(auth) {
            return res.cookie('jwt', access_token, {
                httpOnly: true,
                secure: true
            }).sendStatus(StatusCode.SuccessOK);
        } 
        return res.status(StatusCode.ClientErrorUnauthorized).json({
            error: ErrorConstants.USER_LOGIN_ERROR
        });
    } catch (err) {
        return res.status(StatusCode.ClientErrorBadRequest).json({
            error: ErrorConstants.USER_LOGIN_ERROR
        });
    }
}

const Logout = async (req, res, next) => {
    try {
        res.cookie('jwt', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        })
        res.status(StatusCode.SuccessOK).json();
    } catch (err) {
        return res.status(StatusCode.ClientErrorBadRequest).json();
    }
}

function CheckToken(req, res, next) {
    return res.sendStatus(StatusCode.SuccessOK);
}

const AuthController = {
    Login,
    CheckToken,
    Logout
};

export default AuthController;