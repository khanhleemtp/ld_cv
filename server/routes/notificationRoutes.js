const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(notificationController.getAllNotifications)
  .post(
    authController.protect,
    authController.restrictTo('company', 'admin', 'user'),
    notificationController.createNotification
  );

router
  .route('/:id')
  .get(notificationController.getNotification)
  .post(authController.protect, authController.restrictTo('company', 'admin'))
  .delete(
    authController.protect,
    authController.restrictTo('company', 'admin', 'user'),
    notificationController.deleteNotification
  )
  .patch(
    authController.protect,
    authController.restrictTo('company', 'admin'),
    notificationController.updateNotification
  );

module.exports = router;
