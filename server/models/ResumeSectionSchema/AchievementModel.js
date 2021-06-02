const mongoose = require('mongoose');
const achievementSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});
module.exports = achievementSchema;
