const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
        return res.status(400).json({ error: result.error.issues[0].message });
    }
    req.validatedData = result.data;
    next();
}

module.exports = validate;