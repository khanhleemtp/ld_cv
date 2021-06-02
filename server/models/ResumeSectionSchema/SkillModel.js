const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  showSlider: Boolean,
  items: [
    {
      name: String,
      level: {
        type: Number,
        min: 0,
        max: 10,
      },
    },
  ],
});

module.exports = skillSchema;
