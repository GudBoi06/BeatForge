const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  theme: { type: String, default: "dusky" }, // or "light"
  createdAt: { type: Date, default: Date.now },
  // optional profile fields
  bio: { type: String, default: "" },
  contact: { type: String, default: "" },
  // Stripe subscription id (if any)
  stripeCustomerId: { type: String, default: "" },
  stripeSubscriptionId: { type: String, default: "" }
});

module.exports = mongoose.model("User", UserSchema);
