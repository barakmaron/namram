import jwt from 'jsonwebtoken';

export default function AuthenticateToken(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if(!token)
            return res.sendStatus(401);
        const user_id = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user_id = user_id;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
}