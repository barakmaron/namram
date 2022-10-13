import { ValidationError } from 'express-json-validator-middleware';

export default function ValidationErrorMiddleware(error, req, res, next) {
    if(res.headersSent)
        return next(error);
    const is_validation_error = error instanceof ValidationError;
    if(!is_validation_error)
        return next(error);
    return res.status(400).json({
        error: error.validationErrors
    });
}