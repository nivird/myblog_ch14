const express = require('express');
const router = express.Router();

const blogController = require('../controllers/api/index');

// Homepage
router.get('/', blogController.getHome);

// Dashboard
router.get('/dashboard', blogController.getDashboard);

// View a single post
router.get('/post/:id', blogController.getPost);

// Sign-up form
router.get('/signup', blogController.getSignup);

// Login form
router.get('/login', blogController.getLogin);

// Handle form submissions (dummy implementation)
router.post('/signup', blogController.postSignup);

router.post('/login', blogController.postLogin);

// Logout route (dummy implementation)
router.get('/logout', blogController.getLogout);

module.exports = router;
