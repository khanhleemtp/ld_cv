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
  numEmployees: Number,
  isActive: {
    type: Boolean,
    default: false,
  },
  from: Date,
  to: Date,
  overTime: String,
  country: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
