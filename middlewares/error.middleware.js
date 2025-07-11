const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error (err);

        /*Bad Object ID*/
        if (err.name === "CastError") {
        const message = "Recurso não encontrado";
        error = new Error(message);
        error.statusCode = 404;
        }

        if (err.code === 11000) {
            const message = "Valor duplicado inserido."
            error = new Error(message);
            error.statusCode = 405;
        }

        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || "Erro no servidor."});

    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;