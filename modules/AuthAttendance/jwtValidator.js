const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function jwtValidator(authHeader) {
    // Ensure authHeader is provided and in the expected format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    // Extract the JWT token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token
        isValid=jwt.verify(token, process.env.ACCESS_KEY);
        console.log("validated key successfully")
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = jwtValidator;
