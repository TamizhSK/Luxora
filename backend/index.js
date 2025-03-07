const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Example route: CRUD for wardrobe items
app.get('/api/wardrobe', (req, res) => {
  // Connect to MySQL and fetch wardrobe items
  res.json({ items: [] });
});

// JWT Authentication Middleware Example
const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.listen(4000, () => console.log('Backend running on port 4000'));
