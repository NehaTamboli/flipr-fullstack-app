const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// 🔹 Health Check Endpoint (for Railway or any deploy check)
app.get('/healthz', (req, res) => res.send('OK'));

// 🔹 CONNECT ROUTES
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI) // Mongoose v7+ options not needed
.then(() => {
    console.log("MongoDB Connected");
    // Use PORT from .env if defined, otherwise fallback to 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.log("MongoDB connection error:", err));


