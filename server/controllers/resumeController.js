const { Resume } = require('../models/ResumeModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createResume = factory.createOne(Resume);

exports.getResume = factory.getOne(Resume);

exports.updateResume = factory.updateOne(Resume);

exports.getAllResumes = factory.getAll(Resume);

exports.deleteResume = factory.deleteOne(Resume);
// exports.getMe = (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// };

// exports.updateMe = catchAsync(async (req, res, next) => {
//   // 1. Create error if user POST password data
//   if (req.body.password || req.body.passwordConfirm) {
//     return next(
//       new AppError(
//         'This route is not for password update, please use /updateMyPassword'
//       ),
//       400
//     );
//   }

//   console.log(req.body);
//   // 2. Filter fields allow updates
//   const filteredBody = filterObj(req.body, 'name', 'email');

//   // 3. Update user document

//   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: updatedUser,
//     },
//   });
// });

// exports.deleteMe = catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user.id, { active: false });
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });

// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     message: 'This route is not not defined! Please sign up',
//   });
// };

// Do NOT update with this

// exports.getAllUsers = factory.getAll(User);
// exports.getUser = factory.getOne(User);
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);
