const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // lucide icon name or image url
  description: { type: String, required: true },
  detailedDescription: { type: String }
});

module.exports = mongoose.model('Service', ServiceSchema);
