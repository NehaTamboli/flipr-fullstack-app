const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ===== Root route =====
app.get("/", (req, res) => res.send("Backend is live!"));

// ===== Healthcheck =====
app.get("/healthz", (req, res) => res.send("OK"));

// ===== API Routes =====
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// ===== MongoDB Connection =====
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
  }
})();

// ===== Start Server =====
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
