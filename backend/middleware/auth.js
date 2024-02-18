const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization.split(" ");
        if(authHeader[0] != 'Bearer') {
            return res.json({ message: 'Failed to authorise user'}).status(400);
        }
        const token = authHeader[1];
        const decoded = jwt.verify(token, JWTSECRET);
        if(decoded.userId) {
            // res.json({ message: 'User Authenticated successfully'}).status(200);
            next();
        }
        else {
            return res.json({message: 'Failed to authenticate user'}).status(400);
        }

    } catch(error) {
        return res.status(400).json({ message: 'Failed to authenticate user' })
    }
}

module.exports = { authMiddleware }