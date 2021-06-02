const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(
    authController.protect,
    authController.restrictTo('company', 'admin'),
    jobController.setUserIds,
    jobController.createJob
  );

router
  .route('/:id')
  .get(jobController.getJob)
  .post(authController.protect, authController.restrictTo('company', 'admin'))
  .delete(
    authController.protect,
    authController.restrictTo('company', 'admin'),
    jobController.deleteJob
  )
  .patch(
    authController.protect,
    authController.restrictTo('company', 'admin'),
    jobController.updateJob
  );

module.exports = router;
