const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  items: [
    {
      title: String,
      showTitle: Boolean,
      description: String,
      tags: [
        {
          type: String,
          default: '',
        },
      ],
    },
  ],
});

module.exports = technologySchema;
