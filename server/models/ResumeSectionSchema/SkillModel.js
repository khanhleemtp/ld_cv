const mongoose = require('mongoose');
const { sectionsArray } = require('../ResumeModel');

const skillSchema = new mongoose.Schema({
  showSlider: Boolean,
  items: [
    {
      name: String,
      level: {
        type: Number,
        min: 0,
        max: 10,
      },
    },
  ],
});

const SkillSection = sectionsArray.discriminator('SkillSection', skillSchema);

module.exports = SkillSection;
