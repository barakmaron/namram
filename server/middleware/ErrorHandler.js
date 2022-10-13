export default function ErrorHandler(err, req, res, next) {
    const status = err.statusCode || 500;    
    LogError(err);
    if (res.headersSent)
        return next(err);  
    res.status(status).json({
        "status": status,
        "error": `${err || "Something went wrong"}`
    });
}

function LogError(error) {
    console.log("Received error", error.message);
    console.log("Stacktrace", error.stack);
}