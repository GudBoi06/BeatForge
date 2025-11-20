const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

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
