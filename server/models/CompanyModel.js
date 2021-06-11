const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  phone: String,
  location: String,
  position: String,
  type: String,
  photo: {
    type: String,
    default: '/mario.jpg',
  },
  numEmployees: Number,
  status: {
    type: String,
    enum: ['pending', 'accept', 'reject'],
    default: 'pending',
  },
  intro: String,
  details: String,
  env: [
    {
      type: String,
    },
  ],
  opportunity: [String],
  workTime: String,
  ot: String,
  country: String,

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

companySchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'company',
  localField: '_id',
});

companySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  });
  next();
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
