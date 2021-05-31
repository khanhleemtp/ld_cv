const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema(
  {
    enabled: Boolean,
    name: String,
  },
  { discriminatorKey: 'record', _id: false }
);

module.exports = { baseSchema };
