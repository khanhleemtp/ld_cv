const express = require('express');
const applyController = require('../controllers/applyController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    applyController.setUserIds,
    applyController.createApply
  );

router
  .route('/:id')
  .get(applyController.getApply)
  .post(authController.protect, authController.restrictTo('user', 'admin'))
  .delete(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    applyController.deleteApply
  )
  .patch(
    authController.protect,
    authController.restrictTo('user', 'admin'),
    applyController.updateApply
  );

module.exports = router;
