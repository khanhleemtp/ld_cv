const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  record: {
    type: String,
    default: 'AchievementSection',
  },
  enabled: Boolean,
  name: String,
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});

module.exports = achievementSchema;
