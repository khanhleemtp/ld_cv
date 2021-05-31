const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  record: {
    type: String,
    default: 'EducationSection',
  },
  enabled: Boolean,
  name: String,
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
      showTitle: Boolean,
      degree: String,
      institution: String,
      location: String,
      gpa: Number,
      maxGpa: Number,
      gpaText: String,
      from: Date,
      to: Date,
      showGpa: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      bullets: [String],
    },
  ],
});

module.exports = technologySchema;
