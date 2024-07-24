// Dummy data for demonstration
let blogPosts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.', author: 'user1', createdAt: '2024-07-15', comments: [] },
    { id: 2, title: 'Second Post', content: 'Content of the second post.', author: 'user2', createdAt: '2024-07-16', comments: [] }
];

exports.getHome = (req, res) => {
    res.render('home', { blogPosts });
};

exports.getDashboard = (req, res) => {
    res.render('dashboard', { blogPosts });
};

exports.getPost = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found.');
    }
};

exports.getSignup = (req, res) => {
    res.render('signup');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postSignup = (req, res) => {
    // Handle sign-up logic here (store credentials, etc.)
    // For simplicity, just redirect to login after signup
    res.redirect('/login');
};

exports.postLogin = (req, res) => {
    // Handle login logic here (validate credentials, set session, etc.)
    // For simplicity, just redirect to dashboard after login
    res.redirect('/dashboard');
};

exports.getLogout = (req, res) => {
    // Handle logout logic here (destroy session, clear cookies, etc.)
    // For simplicity, just redirect to homepage after logout
    res.redirect('/');
};

exports.getAllPosts = (req, res) => {
    res.json(blogPosts);
};

exports.getPostById = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found.' });
};

exports.createPost = (req, res) => {
    const newPost = {
        id: blogPosts.length + 1,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: new Date().toISOString(),
        comments: []
    };
    blogPosts.push(newPost);
    res.status(201).json(newPost);
};

exports.updatePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find(post => post.id === postId);
    if (post) {
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.author = req.body.author || post.author;
        res.json(post);
    } else {
        res.status(404).json({ error: 'Post not found.' });
    }
};

exports.deletePost = (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Post not found.' });
    }
}
}