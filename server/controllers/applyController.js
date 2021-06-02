const factory = require('./handleFactory');
const Apply = require('../models/ApplyModel');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createApply = factory.createOne(Apply);

exports.getApply = factory.getOne(Apply);

exports.updateApply = factory.updateOne(Apply);

exports.getAllApplys = factory.getAll(Apply);

exports.deleteApply = factory.deleteOne(Apply);
