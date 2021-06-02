const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema(
  {
    title: String,
    salary: [Number],
    location: [String],
    type: String,
    tags: [String],
    createdAt: Date,
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
    },
    descriptions: [String],
    requirements: [String],
  },
  {
    //virtuals properties not save in db but caculate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
