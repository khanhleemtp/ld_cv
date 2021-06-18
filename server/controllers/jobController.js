const factory = require('./handleFactory');
const Job = require('../models/JobModel');
const _ = require('lodash');
const catchAsync = require('../utils/catchAsync');
const moment = require('moment');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getJobSearch = catchAsync(async (req, res, next) => {
  const searching = await Job.aggregate([
    {
      $project: { slugs: 1, position: 1, _id: 0, tags: 1, to: 1 },
    },
  ]);
  const slugsArr = _.map(searching, 'slugs');
  const tagsArr = _.map(searching, 'tags');

  const positionArr = _.map(searching, 'position');

  const slug = _.union(...slugsArr);

  let tag = _.union(...tagsArr);
  tag = _.map(tag, (t) => ({ label: _.capitalize(t), value: t }));

  let position = _.compact(_.union(positionArr));
  position = _.map(position, (t) => ({ label: _.capitalize(t), value: t }));

  res.status(200).json({
    status: 'success',
    data: {
      slug,
      position,
      tag,
    },
  });
});

exports.setConditionSearch = (req, res, next) => {
  let query = {
    ...req.query,
    to: {
      gte: moment().toISOString(),
    },
  };
  const location = req.body.location;
  query = location === 'all' ? { ...query } : { ...query, location };

  if (!_.isEmpty(req.body.tags) || !_.isEmpty(req.body.positions)) {
    const orQuery = {
      or: [
        {
          tags: {
            in: req.body.tags,
          },
        },
        {
          position: {
            in: req.body.positions,
          },
        },
      ],
    };

    query = { ...orQuery, ...query };
  }

  console.log('query', query);
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
