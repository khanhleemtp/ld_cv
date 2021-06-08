const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  company: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  image: String,
  location: String,
  position: String,
  type: String,
  photo: String,
  numEmployees: Number,
  isActive: {
    type: Boolean,
    default: false,
  },
  intro: String,
  env: [String],
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

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
