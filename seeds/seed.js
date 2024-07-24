const { Client } = require('pg');

// Database connection configuration
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'blog_db',
    password: 'password',
    port: 5432,
});

// Sample data
const users = [
    { username: 'user1', password: 'password123', email: 'user1@example.com' },
    { username: 'user2', password: 'password456', email: 'user2@example.com' },
];

const posts = [
    { title: 'First Post', content: 'This is the content of the first post.', author: 'user1' },
    { title: 'Second Post', content: 'Content of the second post.', author: 'user2' },
];

const runSeed = async () => {
    try {
        await client.connect();

        // Clear existing data
        await client.query('TRUNCATE TABLE users, posts RESTART IDENTITY CASCADE');

        // Insert users
        for (const user of users) {
            await client.query('INSERT INTO users(username, password, email) VALUES($1, $2, $3)', [user.username, user.password, user.email]);
        }

        // Insert posts
        for (const post of posts) {
            await client.query('INSERT INTO posts(title, content, author) VALUES($1, $2, $3)', [post.title, post.content, post.author]);
        }

        console.log('Seed data inserted successfully.');
    } catch (err) {
        console.error('Error running seed:', err);
    } finally {
        await client.end();
    }
};

runSeed();
