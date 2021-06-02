const mongoose = require('mongoose');

const courceSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});

module.exports = courceSchema;
