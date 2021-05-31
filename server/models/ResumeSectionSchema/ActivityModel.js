const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const activitySchema = new mongoose.Schema({
  items: [
    {
      title: String,
      location: String,
      description: String,
      link: String,
      from: Date,
      to: Date,
      bullets: [String],
      showTitle: Boolean,
      showDescription: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      showLink: Boolean,
    },
  ],
});

const ActivitySection = sectionsArray.discriminator(
  'ActivitySection',
  activitySchema
);

module.exports = ActivitySection;
