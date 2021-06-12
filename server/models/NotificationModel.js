const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  message: {
    type: String,
  },
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
