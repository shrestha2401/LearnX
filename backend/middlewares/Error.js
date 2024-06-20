const ErrorMiddleware = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Server Error"

 res.status(err.statusCode).json({
    success: false,
    mesage: err.message 
 })
};

export default ErrorMiddleware
