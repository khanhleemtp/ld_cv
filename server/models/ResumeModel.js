const mongoose = require('mongoose');
const recordSchema = require('./RecordModel');

const headerSchema = require('./ResumeSectionSchema/headerSchema');
const resumeSchema = new mongoose.Schema({
  style: {
    record: String,
    colors: String,
    layout: String,
    layoutSize: String,
    background: null,
    fontBody: String,
    fontHeading: String,
    marginOption: {
      type: String,
      enum: [1, 2, 3, 4],
    },
  },

  sections: [recordSchema],
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
