const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Handlebars setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Dummy data for demonstration
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.', author: 'user1', createdAt: '2024-07-15', comments: [] },
    { id: 2, title: 'Second Post', content: 'Content of the second post.', author: 'user2', createdAt: '2024-07-16', comments: [] }
];

// Routes
// Homepage
app.get('/', (req, res) => {
    res.render('home', { blogPosts });
});

// Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard', { blogPosts });
});

// View a single post
app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found.');
    }
});

// Sign-up form
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Login form
app.get('/login', (req, res) => {
    res.render('login');
});

// Handle form submissions (dummy implementation)
app.post('/signup', (req, res) => {
    // Handle sign-up logic here (store credentials, etc.)
    // For simplicity, just redirect to login after signup
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    // Handle login logic here (validate credentials, set session, etc.)
    // For simplicity, just redirect to dashboard after login
    res.redirect('/dashboard');
});

// Logout route (dummy implementation)
app.get('/logout', (req, res) => {
    // Handle logout logic here (destroy session, clear cookies, etc.)
    // For simplicity, just redirect to homepage after logout
    res.redirect('/');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
