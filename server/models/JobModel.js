const mongoose = require('mongoose');
const slugify = require('slugify');
const moment = require('moment');
const jobSchema = new mongoose.Schema(
  {
    title: String,
    salary: String,
    location: String,
    type: String,
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    slugs: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    to: {
      type: Date,
    },
    position: String,
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

jobSchema.pre('save', function (next) {
  this.slugs = this.tags.map((item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );
  next();
});

// jobSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'company',
//     select: 'company location -_id',
//   });
//   next();
// });

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
jobSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({
    to: {
      $gte: moment().toISOString(),
    },
  });
  next();
});

jobSchema.post('findOneAndUpdate', function (doc, next) {
  console.log(doc);
  doc.slugs = doc.tags.map((item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );
  doc.save();
  console.log(doc);
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
