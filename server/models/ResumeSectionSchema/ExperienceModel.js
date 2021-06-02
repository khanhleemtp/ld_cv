const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  items: [
    {
      bullets: [String],
      position: String,
      workplace: String,
      description: String,
      location: String,
      from: Date,
      to: Date,
      showTitle: Boolean,
      showCompany: Boolean,
      showDescription: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      showLink: Boolean,
    },
  ],
});

module.exports = experienceSchema;
