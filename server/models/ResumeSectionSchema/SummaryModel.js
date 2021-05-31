const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const summarySchema = new mongoose.Schema({
  items: [
    {
      text: String,
    },
  ],
});

const SummarySection = sectionsArray.discriminator(
  'SummarySection',
  summarySchema
);

module.exports = SummarySection;
