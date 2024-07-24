const { Client } = require('pg');

// Database connection configuration
const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Connect to the database
const connectToDb = async () => {
    try {
        await client.connect();
        console.log('Connected to the database.');
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

// Query the database
const queryDb = async (text, params) => {
    try {
        const res = await client.query(text, params);
        return res.rows;
    } catch (err) {
        console.error('Error querying the database:', err);
        throw err;
    }
};

// Disconnect from the database
const disconnectFromDb = async () => {
    try {
        await client.end();
        console.log('Disconnected from the database.');
    } catch (err) {
        console.error('Error disconnecting from the database:', err);
    }
};

module.exports = {
    connectToDb,
    queryDb,
    disconnectFromDb,
};
