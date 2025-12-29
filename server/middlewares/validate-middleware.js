const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Validation failed";
        
        // Format all validation errors
        let extraDetails = "Validation error";
        
        if (err.errors && err.errors.length > 0) {
            // Get all error messages
            extraDetails = err.errors.map(e => e.message).join(', ');
        }

        const error = {
            status,
            message,
            extraDetails
        };

        console.log("Validation error details:", extraDetails);
        next(error);
    }
};

export default validate;