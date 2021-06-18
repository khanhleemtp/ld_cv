const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/UserModel');
const Company = require('../models/CompanyModel');
const Job = require('../models/JobModel');

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

exports.aliasTopCompany = (req, res, next) => {
  req.query.limit = '8';
  req.query.status = 'accept';
  req.query.sort = 'name';
  req.query.fields = 'name,photo,location';
  next();
};

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
    status: 'pending',
  });

  await User.findByIdAndUpdate(
    company.user,
    { role: 'user' },
    {
      new: true,
    }
  );
  await Job.deleteMany({ company: req.params.id });

  res.status(200).json({
    status: 'success',
    data: company,
  });
});

exports.getCompany = factory.getOne(Company, {
  path: 'jobs',
  select: 'tags salary title location createdAt position',
});

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
