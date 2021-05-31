const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
  record: {
    type: String,
    default: 'Header',
  },
  name: String,
  title: String,
  email: String,
  location: String,
  phone: String,
  link: String,
  showTitle: Boolean,
  showPhone: Boolean,
  showLink: Boolean,
  showEmail: Boolean,
  showLocation: Boolean,
  uppercaseName: Boolean,
  showPhoto: Boolean,
  photoStyle: String,
  photo: String,
});

module.exports = headerSchema;
