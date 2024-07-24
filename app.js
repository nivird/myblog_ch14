// app.js
const express = require('express');
const app = express();

// Import routes
const apiRoutes = require('./controllers/api/index');
const authRoutes = require('./controllers/api/auth');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/posts', apiRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
