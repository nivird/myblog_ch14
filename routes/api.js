const express = require('express');
const router = express.Router();

const blogController = require('../controllers/api/index');

// Get all blog posts
router.get('/posts', blogController.getAllPosts);

// Get a single blog post
router.get('/posts/:id', blogController.getPostById);

// Create a new blog post
router.post('/posts', blogController.createPost);

// Update an existing blog post
router.put('/posts/:id', blogController.updatePost);

// Delete a blog post
router.delete('/posts/:id', blogController.deletePost);

module.exports = router;
