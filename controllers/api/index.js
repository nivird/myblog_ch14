const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Database connection setup
const pool = new Pool({
    user: 'postgres',        // database name
    host: 'localhost',
    database: 'blog_db',      // database name
    password: 'password',     // database password
    port: 5432,
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO posts (title, content, author, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [title, content, author]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Update an existing blog post
router.put('/:id', async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { title, content, author } = req.body;
    try {
        const result = await pool.query(
            'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
            [title, content, author, postId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a blog post
router.delete('/:id', async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [postId]);
        if (result.rows.length > 0) {
            res.status(204).send(); // No content
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
