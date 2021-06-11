const factory = require('./handleFactory');
const Job = require('../models/JobModel');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createJob = factory.createOne(Job);

exports.getJob = factory.getOne(Job, {
  path: 'companyFrom',
  select: 'photo name',
});

exports.updateJob = factory.updateOne(Job);

exports.getAllJobs = factory.getAll(Job);

exports.deleteJob = factory.deleteOne(Job);
