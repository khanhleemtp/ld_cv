const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  record: String,
  enabled: Boolean,
  name: String,
  items: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = recordSchema;
