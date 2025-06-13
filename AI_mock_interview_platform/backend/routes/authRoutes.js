const express = require("express");
const router = express.Router();
const admin = require("../config/firebaseAdmin");

router.post("/set-role", async (req, res) => {
  const { uid, role } = req.body;

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    res.json({ message: "Role assigned" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
