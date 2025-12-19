const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String
});

module.exports = mongoose.model("Project", ProjectSchema);
