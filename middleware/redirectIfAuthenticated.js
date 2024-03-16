const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const secretKey = process.env.JWT_KEY

const authenticated = async(req, res, next) => {
    
    const bearerHeader = req.header('Authorization');

    if (bearerHeader === null || bearerHeader === undefined || !bearerHeader || bearerHeader.trim() === '') {
        return res.status(401).json({ message: 'Invalid or missing token' });
    }

    const bearer = bearerHeader.split(' ');
    const token = bearer[1]; 

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ status: false, message: 'Token expired. Please log in again.' });
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ status: false, message: 'Invalid token. Please log in again.' });
            } else {
                return res.status(403).json({ status: false, message: 'Forbidden. Please log in again.' });
            }
        }
    
        req.user = decoded;
        next();
    });
    
}

module.exports = authenticated