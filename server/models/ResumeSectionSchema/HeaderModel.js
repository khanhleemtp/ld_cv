const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    link: String,
    showTitle: {
      type: Boolean,
    },
    showPhone: {
      type: Boolean,
    },
    showLink: {
      type: Boolean,
    },
    showEmail: {
      type: Boolean,
    },
    showLocation: {
      type: Boolean,
    },
    uppercaseName: {
      type: Boolean,
    },
    showPhoto: {
      type: Boolean,
    },
    photoStyle: String,
    photo: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = headerSchema;
