const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  items: [
    {
      institution: String,
      role: String,
      location: String,
      description: String,
      from: Date,
      to: Date,
      bullets: [String],
      showDescription: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      showLink: Boolean,
    },
  ],
});

module.exports = volunteerSchema;
