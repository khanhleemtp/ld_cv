const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const educationSchema = new mongoose.Schema({
  items: [
    {
      degree: String,
      institution: String,
      location: String,
      gpa: Number,
      maxGpa: Number,
      gpaText: String,
      from: Date,
      to: Date,
      bullets: [String],
      showGpa: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
    },
  ],
});

const EducationSection = sectionsArray.discriminator(
  'EducationSection',
  educationSchema
);

module.exports = EducationSection;
