// controllers/api/index.js
const { queryDb, connectToDb, disconnectFromDb } = require('../../utils/dbUtils');

const getPosts = async (req, res) => {
    try {
        await connectToDb();
        const posts = await queryDb('SELECT * FROM posts');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    } finally {
        await disconnectFromDb();
    }
};

module.exports = { getPosts };
