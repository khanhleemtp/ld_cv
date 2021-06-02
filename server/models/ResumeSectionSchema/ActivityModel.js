const mongoose = require('mongoose');

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

module.exports = activitySchema;
