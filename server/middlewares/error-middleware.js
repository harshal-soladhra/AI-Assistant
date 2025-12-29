const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    const extraDetails = err.details || "backend error";
    return res.status(status).json({ message,extraDetails });
}

export default errorMiddleware;