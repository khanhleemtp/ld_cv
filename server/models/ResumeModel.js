const mongoose = require('mongoose');
const { baseSchema } = require('./ResumeSectionSchema/BaseSectionModel');
const resumeSchema = new mongoose.Schema({
  style: {
    record: String,
    colors: String,
    layout: String,
    layoutSize: String,
    background: String,
    fontBody: String,
    fontHeading: String,
    marginOption: {
      type: String,
      enum: [1, 2, 3, 4],
    },
  },
  header: {
    record: {
      type: String,
      default: 'Header',
    },
    name: String,
    title: String,
    email: String,
    location: String,
    phone: String,
    link: String,
    showTitle: Boolean,
    showPhone: Boolean,
    showLink: Boolean,
    showEmail: Boolean,
    showLocation: Boolean,
    uppercaseName: Boolean,
    showPhoto: Boolean,
    photoStyle: String,
    photo: String,
  },
  sections: [baseSchema],
  title: String,
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
});

const sectionsArray = resumeSchema.path('sections');

module.exports = {
  Resume: mongoose.model('Resume', resumeSchema),
  sectionsArray,
};
