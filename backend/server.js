const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Keep uploads accessible

// ===== Healthcheck Endpoint (important for Railway) =====
app.get("/healthz", (req, res) => res.send("OK"));

// ===== API Routes =====
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB connection error ❌", err));

// ===== Serve Frontend =====
const frontendPath = path.join(__dirname, "../frontend/landing");
app.use(express.static(frontendPath));

// ===== Catch-all route (after all APIs and healthcheck) =====
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
