import jwt from 'jsonwebtoken';
import { StatusCode } from 'status-code-enum';

export default function AuthenticateToken(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token)
            return res.sendStatus(StatusCode.ClientErrorUnauthorized);
        const user_id = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user_id = user_id;
        next();
    } catch (err) {
        return res.sendStatus(StatusCode.ClientErrorForbidden);
    }
}