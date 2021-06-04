const mongoose = require('mongoose');
var slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    title: String,
    salary: [Number],
    location: [String],
    type: String,
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    slugs: [String],
    createdAt: Date,
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

jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'company',
    select: 'company location -_id',
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
