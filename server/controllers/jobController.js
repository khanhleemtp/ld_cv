const factory = require('./handleFactory');
const Job = require('../models/JobModel');
const _ = require('lodash');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.setConditionSearch = (req, res, next) => {
  let query = { ...req.query };
  if (!_.isEmpty(req.body)) {
    const slugs = req.body.slugs || [''];
    const positions = req.body.positions || [''];
    const location = req.body.location;
    query = {
      ...query,
      or: [
        {
          slugs: {
            in: slugs,
          },
        },
        {
          position: {
            in: positions,
          },
        },
      ],
      location: location,
    };
  }
  req.query = query;
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
