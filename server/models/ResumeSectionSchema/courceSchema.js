const mongoose = require('mongoose');

const courceSchema = new mongoose.Schema({
  record: {
    type: String,
    default: 'CourceSection',
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

module.exports = courceSchema;
