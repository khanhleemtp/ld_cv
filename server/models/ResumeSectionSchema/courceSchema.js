const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const courceSchema = new mongoose.Schema({
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});

const CourceSection = sectionsArray.discriminator(
  'CourceSection',
  courceSchema
);

module.exports = CourceSection;
