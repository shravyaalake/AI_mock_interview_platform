const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route to save a new user role
router.post("/save-user-role", async (req, res) => {
  const { uid, email, role } = req.body;
  try {
    const existing = await User.findOne({ uid });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ uid, email, role });
    await newUser.save();
    res.status(201).json({ message: "User saved to MongoDB" });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get user role by uid
router.get("/user/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ role: user.role });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
