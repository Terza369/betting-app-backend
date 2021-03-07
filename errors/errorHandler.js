module.exports = (error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({
        message: error.message
    });
}