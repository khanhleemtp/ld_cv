const mongoose = require('mongoose');
const applySchema = new mongoose.Schema({
  job: {
    type: mongoose.Types.ObjectId,
    ref: 'Job',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
