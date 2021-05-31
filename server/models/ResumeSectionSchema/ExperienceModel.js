const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const experienceSchema = new mongoose.Schema({
  items: [
    {
      position: String,
      workplace: String,
      location: String,
      description: String,
      from: Date,
      to: Date,
      bullets: [String],
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

const ExperienceSection = sectionsArray.discriminator(
  'ExperienceSection',
  experienceSchema
);

module.exports = ExperienceSection;
