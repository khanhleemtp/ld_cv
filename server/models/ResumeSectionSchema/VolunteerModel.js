const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

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

const VolunteerSection = sectionsArray.discriminator(
  'VolunteerSection',
  volunteerSchema
);

module.exports = VolunteerSection;
