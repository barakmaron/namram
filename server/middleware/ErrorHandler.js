import { StatusCode } from 'status-code-enum';

export default function ErrorHandler(err, req, res, next) {
    const status = err.statusCode || StatusCode.ServerErrorInternal;    
    LogError(err);
    if (res.headersSent)
        return next(err);  
    return res.status(status).json({
        "status": status,
        "error": `${err.name || "Something went wrong"}`
    });
}

function LogError(error) {
    console.log("Received error", error.message);
    console.log("Stacktrace", error.stack);
}