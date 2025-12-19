// server.js
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

// ===== Root & Healthcheck Routes =====
app.get("/", (req, res) => res.send("Backend is live!"));
app.get("/healthz", (req, res) => res.send("OK"));

// ===== API Routes =====
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// ===== MongoDB Connection =====
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // URL-encoded password in .env
    console.log("MongoDB Connected ✅");

    // Start server only after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} ✅`);
    });
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
    setTimeout(connectDB, 5000); // Retry after 5s if failed
  }
};

connectDB();
