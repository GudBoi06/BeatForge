require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const presetRoutes = require("./routes/presetRoutes");
const contactRoutes = require("./routes/contactRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/presets", presetRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscription", subscriptionRoutes);

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("BeatForge Backend Running ✔");
});

// Routes
const beatRoutes = require("./routes/beatRoutes");
app.use("/api/beats", beatRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log("Server started on " + PORT));


