const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST → User submits contact form
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Contact saved" });
});

// GET → Admin views contact data
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

module.exports = router;
