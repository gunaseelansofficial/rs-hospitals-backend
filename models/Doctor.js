const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  photo: { type: String, default: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300' },
  bio: { type: String, required: true },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
