const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const Company = require('../models/CompanyModel');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createCompany = factory.createOne(Company, [
  'company',
  'image',
  'location',
  'position',
  'type',
  'numEmployees',
  'from',
  'to',
  'overTime',
  'country',
  'user',
]);

exports.acceptCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, {
    isActive: true,
  });

  const updatedUser = await User.findByIdAndUpdate(
    company.user,
    { role: 'company' },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: company,
    user: updatedUser,
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });

  const updatedUser = await User.findByIdAndUpdate(
    company.user,
    { role: 'user' },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: company,
    user: updatedUser,
  });
});

exports.getCompany = factory.getOne(Company);

exports.updateCompany = factory.updateOne(Company, [
  'image',
  'location',
  'position',
  'type',
  'numEmployees',
  'from',
  'to',
  'overTime',
  'country',
  'user',
]);

exports.getAllCompanies = factory.getAll(Company);

// exports.deleteCompany = factory.deleteOne(Company);
