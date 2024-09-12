const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Your MySQL username
    password: '@sa2005.',    // Your MySQL password
    database: 'login_demo'  // Replace with your database name
});

// Connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// POST route to register a new user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.execute(checkQuery, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: 'Username already exists' });
        } else {
            // Insert new user into database
            const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.execute(insertQuery, [username, password], (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Failed to register user' });
                }
                return res.json({ success: true, message: 'User registered successfully' });
            });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
