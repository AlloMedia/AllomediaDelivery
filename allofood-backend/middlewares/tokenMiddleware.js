const validateToken = require("../validations/tokenValidation");

function checkTokenMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies["authToken"];

    if (!token) {
        return res.status(401).json({ error: "Access denied, you need to log in" });
    }

    // Verify token
    const decoded_user = validateToken(token);
    if (!decoded_user.success) {
        return res.status(401).json({ error: "Access denied" });
    }

    req.user = decoded_user.data;    
    next();
}

module.exports = checkTokenMiddleware;