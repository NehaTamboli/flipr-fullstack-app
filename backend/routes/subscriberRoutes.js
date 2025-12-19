const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// POST → Newsletter subscribe
router.post("/", async (req, res) => {
  const subscriber = new Subscriber(req.body);
  await subscriber.save();
  res.json({ message: "Subscribed" });
});

// GET → Admin views subscribers
router.get("/", async (req, res) => {
  const subscribers = await Subscriber.find();
  res.json(subscribers);
});

module.exports = router;
