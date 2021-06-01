const mongoose = require('mongoose');
const { baseSchema } = require('./ResumeSectionSchema/BaseSectionModel');
const resumeSchema = new mongoose.Schema(
  {
    style: {
      record: String,
      colors: [String],
      layout: String,
      layoutSize: String,
      background: String,
      fontBody: String,
      fontHeading: String,
      marginOption: {
        type: Number,
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
    createdAt: { type: Date },
    updatedAt: { type: Date },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    //virtuals properties not save in db but caculate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const sectionsArray = resumeSchema.path('sections');

module.exports = {
  Resume: mongoose.model('Resume', resumeSchema),
  sectionsArray,
};
