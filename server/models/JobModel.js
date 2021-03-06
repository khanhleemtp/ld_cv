const mongoose = require('mongoose');
const slugify = require('slugify');
const moment = require('moment');
const _ = require('lodash');
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
      require: [true, 'Hãy nhập tiêu đề công việc'],
    },
    salary: {
      type: String,
      trim: true,
      lowercase: true,
      require: [true, 'Hãy nhập mức lương'],
    },
    location: String,
    type: String,
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
        require: [true],
      },
    ],
    slugs: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    to: {
      type: Date,
      min: [Date.now(), 'Hãy nhập thời gian hợp lệ'],
    },
    position: {
      type: String,
      lowercase: true,
      require: [true, 'Hãy nhập kỹ năng'],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
    },
    descriptions: [
      { type: String, require: [true, 'Hãy nhập mô tả công việc'] },
    ],
    requirements: [
      { type: String, require: [true, 'Hãy nhập yêu cầu công việc'] },
    ],
  },
  {
    //virtuals properties not save in db but caculate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    validateBeforeSave: true,
  }
);

jobSchema.pre('save', function (next) {
  this.slugs = this.tags.map((item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );
  next();
});

jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'company name location photo',
    match: {
      status: 'accept',
    },
    sort: {
      level: 1,
    },
  });
  next();
});

jobSchema.virtual('companyFrom', {
  ref: 'Company',
  foreignField: '_id',
  localField: 'company',
  justOne: true,
});

jobSchema.virtual('applies', {
  ref: 'Apply',
  foreignField: '_id',
  localField: 'job',
  justOne: true,
});

// get all job active
// jobSchema.pre(/^find/, function (next) {
//   // this points to current query
//   this.find({
//     to: {
//       $gte: moment().toISOString(),
//     },
//   });
//   next();
// });

jobSchema.post('findOneAndUpdate', function (doc, next) {
  // console.log(doc);
  doc.slugs = doc.tags.map((item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );

  doc.save();
  console.log(doc);
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
