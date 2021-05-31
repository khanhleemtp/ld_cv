const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const technologySchema = new mongoose.Schema({
  items: [
    {
      title: String,
      showTitle: Boolean,
      description: String,
      tags: [String],
    },
  ],
});

const TechnologySection = sectionsArray.discriminator(
  'TechnologySection',
  technologySchema
);

module.exports = TechnologySection;
