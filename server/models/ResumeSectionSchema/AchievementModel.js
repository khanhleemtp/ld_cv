const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const achievementSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});

const AchievementSection = sectionsArray.discriminator(
  'AchievementSection',
  achievementSchema
);

module.exports = AchievementSection;
