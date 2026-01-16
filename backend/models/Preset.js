const mongoose = require("mongoose");
const PresetSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  bpm: Number,
  grid: Array,
  samples: Array,
  pluginSettings: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Preset", PresetSchema);
