const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
uid: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
role: { type: String, enum: ["student", "admin", "institute"], default: "student" },
createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);