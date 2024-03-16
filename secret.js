const crypto = require('crypto');

const generateSecretKey = () => {
    const secret = crypto.randomBytes(32).toString('hex');
    console.log(`secret key : ${secret}`);
}

generateSecretKey();