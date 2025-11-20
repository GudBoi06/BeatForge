const mongoose = require("mongoose");

const BeatSchema = new mongoose.Schema({
  name: { type: String, required: true },

  bpm: { type: Number, default: 128 },

  samples: [
    {
      id: String,
      name: String,
      url: String,   // cloudinary URL
    }
  ],

  grid: [
    {
      soundId: String,
      steps: [Number]   // 0 or 1 for 16 steps
    }
  ],

  pluginSettings: {
    cutoff: { type: Number, default: 50 },
    resonance: { type: Number, default: 20 },
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Beat", BeatSchema);
