const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/firebaseAuth');

router.get('/', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, your token is valid!` });
});

module.exports = router;
