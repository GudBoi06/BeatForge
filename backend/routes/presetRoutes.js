const express = require("express");
const router = express.Router();
const Preset = require("../models/Preset");

// save preset
router.post("/", async (req, res) => {
  const preset = await Preset.create(req.body);
  res.json(preset);
});

// get all public presets
router.get("/", async (req, res) => {
  const presets = await Preset.find().sort({ createdAt:-1 });
  res.json(presets);
});

// get one
router.get("/:id", async (req, res) => {
  const p = await Preset.findById(req.params.id);
  res.json(p);
});

module.exports = router;
