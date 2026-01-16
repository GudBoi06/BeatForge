const mongoose = require("mongoose");
const SubSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  plan: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Subscription", SubSchema);
