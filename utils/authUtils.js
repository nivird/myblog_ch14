const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hash a password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};

// Compare a password with a hash
const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (err) {
        console.error('Error comparing password:', err);
        throw err;
    }
};

// Generate a JWT token
const generateToken = (user) => {
    try {
        const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('Error generating token:', err);
        throw err;
    }
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};
