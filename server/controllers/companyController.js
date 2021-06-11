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
  'name',
  'location',
  'position',
  'user',
  'phone',
  'website',
]);

exports.acceptCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, req.body);
  req.body.status === 'accept'
    ? await User.findByIdAndUpdate(
        company.user,
        { role: 'company' },
        {
          new: true,
        }
      )
    : await Company.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    // data: company,
  });
});

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const company = await Company.findByIdAndUpdate(req.params.id, {
    status: 'reject',
  });

  await User.findByIdAndUpdate(
    company.user,
    { role: 'user' },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 'success',
    data: company,
  });
});

exports.getCompany = factory.getOne(Company);

exports.updateCompany = factory.updateOne(Company, [
  'location',
  'position',
  'type',
  'numEmployees',
  'from',
  'to',
  'overTime',
  'country',
  'user',
  'phone',
  'env',
  'photo',
  'ot',
  'opportunity',
  'workTime',
  'country',
  'intro',
  'details',
]);

exports.getAllCompanies = factory.getAll(Company);

// exports.deleteCompany = factory.deleteOne(Company);
