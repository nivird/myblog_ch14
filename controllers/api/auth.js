// controllers/api/auth.js
const { hashPassword, comparePassword, generateToken } = require('../../utils/authUtils');
const { queryDb } = require('../../utils/dbUtils');

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        await queryDb('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const users = await queryDb('SELECT * FROM users WHERE username = $1', [username]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, users[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(users[0]);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in' });
    }
};

module.exports = { registerUser, loginUser };
