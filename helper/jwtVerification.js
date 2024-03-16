const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();
const secretKey = process.env.JWT_KEY

const generateToken = async(user) => {
    try {
        const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
        return token;
    } catch (err) {
        return { error: err.message }
    } 
    // finally {
    //     console.log('secret keys : ' + secretKey);
    // }
}


module.exports = {
    generateToken
}