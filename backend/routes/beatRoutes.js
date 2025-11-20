const express = require("express");
const router = express.Router();
const Beat = require("../models/Beat");

router.post("/", async (req, res) => {
  try {
    const beat = await Beat.create(req.body);
    res.json(beat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const beats = await Beat.find().sort({ createdAt: -1 });
  res.json(beats);
});

router.get("/:id", async (req, res) => {
  const beat = await Beat.findById(req.params.id);
  res.json(beat);
});

router.put("/:id", async (req, res) => {
  const updated = await Beat.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Beat.findByIdAndDelete(req.params.id);
  res.json({ message: "Beat deleted" });
});

module.exports = router;
