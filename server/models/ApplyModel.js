const mongoose = require('mongoose');
const applySchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'accept', 'reject'],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    responseAt: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

applySchema.index({ job: 1, user: 1 }, { unique: true });

applySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'job',
    select: 'title position',
  });
  next();
});

applySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email resume',
  });
  next();
});

const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
