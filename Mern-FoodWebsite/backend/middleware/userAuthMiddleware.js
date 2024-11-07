const jwt = require('jsonwebtoken');


const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Provide a valid token'
        });
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decodeToken) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid token'
            });
        }
        // Attach decoded token to request for later use
        req.user = decodeToken;
        next();
    } catch (error) {
        console.error('Error while verifying the token:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error while verifying the token'
        });
    }
};

module.exports = authenticate;
