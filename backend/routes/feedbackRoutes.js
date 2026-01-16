const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// submit feedback
router.post("/", async (req, res) => {
  try {
    const feed = await Feedback.create(req.body);
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// optional: get all feedback (admin)
router.get("/", async (req, res) => {
  const list = await Feedback.find().sort({ createdAt: -1 });
  res.json(list);
});

module.exports = router;
