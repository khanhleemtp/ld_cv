const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

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

const ExperienceSection = sectionsArray.discriminator(
  'ExperienceSection',
  experienceSchema
);

module.exports = ExperienceSection;
