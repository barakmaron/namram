import { ValidationError } from 'express-json-validator-middleware';
import { validationResult } from 'express-validator';

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

export const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            errors: errors.array()
        });
    };
};