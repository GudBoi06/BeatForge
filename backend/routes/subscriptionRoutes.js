const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "sk_test_xxx");
const User = require("../models/User");
const Subscription = require("../models/Subscription");
const auth = require("../middleware/auth");

// create Stripe checkout session (frontend will call this)
router.post("/create-checkout-session", auth, async (req, res) => {
  const { priceId, planName } = req.body; // priceId from Stripe dashboard (test)
  const userId = req.user.id;

  try {
    // In test flow we simply create a Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || "http://localhost:3000"}/subscription/cancel`,
      // optional: attach customer email
      metadata: { userId }
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// record subscription (optional webhook approach recommended for production)
router.post("/record", auth, async (req, res) => {
  // simple endpoint to save subscription details after frontend gets them
  const { stripeCustomerId, stripeSubscriptionId, plan } = req.body;
  try {
    const sub = await Subscription.create({
      user: req.user.id,
      stripeCustomerId,
      stripeSubscriptionId,
      plan,
      status: "active"
    });
    await User.findByIdAndUpdate(req.user.id, {
      stripeCustomerId,
      stripeSubscriptionId
    });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
