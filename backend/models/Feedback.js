const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Feedback", FeedbackSchema);
