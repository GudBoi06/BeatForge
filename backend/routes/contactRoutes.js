const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const c = await Contact.create(req.body);
  res.json(c);
});

module.exports = router;
