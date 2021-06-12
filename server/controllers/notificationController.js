const factory = require('./handleFactory');
const Notification = require('../models/NotificationModel');

exports.createNotification = factory.createOne(Notification);

exports.getNotification = factory.getOne(Notification);

exports.updateNotification = factory.updateOne(Notification);

exports.getAllNotifications = factory.getAll(Notification);

exports.deleteNotification = factory.deleteOne(Notification);
