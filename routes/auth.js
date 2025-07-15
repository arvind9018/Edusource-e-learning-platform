const express = require('express');
const router = express.Router();

// Mock user database
const users = [];

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  users.push({ name, email, password, profilePic: 'https://via.placeholder.com/38' });
  res.json({ success: true });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { name: user.name, profilePic: user.profilePic } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.get('/user', (req, res) => {
  // Simulate session-based authentication
  const user = users[users.length - 1]; // Last signed-up user for demo
  if (user) {
    res.json({ success: true, user: { name: user.name, profilePic: user.profilePic } });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;