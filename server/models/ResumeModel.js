const mongoose = require('mongoose');
const baseSchema = require('./ResumeSectionSchema/BaseSectionModel');
const achievementSchema = require('./ResumeSectionSchema/AchievementModel');
const activitySchema = require('./ResumeSectionSchema/ActivityModel');
const courceSchema = require('./ResumeSectionSchema/CourceModel');
const educationSchema = require('./ResumeSectionSchema/EducationModel');
const experienceSchema = require('./ResumeSectionSchema/ExperienceModel');
const skillSchema = require('./ResumeSectionSchema/SkillModel');
const summarySchema = require('./ResumeSectionSchema/SummaryModel');
const technologySchema = require('./ResumeSectionSchema/TechnologyModel');
const volunteerSchema = require('./ResumeSectionSchema/VolunteerModel');
const headerSchema = require('./ResumeSectionSchema/HeaderModel');

const resumeSchema = new mongoose.Schema(
  {
    style: {
      record: String,
      colors: [String],
      layout: String,
      layoutSize: String,
      background: String,
      fontBody: String,
      fontHeading: String,
      marginOption: {
        type: Number,
        enum: [1, 2, 3, 4],
      },
    },
    header: baseSchema,
    sections: [baseSchema],
    title: String,
    createdAt: { type: Date },
    updatedAt: { type: Date },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    //virtuals properties not save in db but caculate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// header
const headerPath = resumeSchema.path('header');
headerPath.discriminator('Header', headerSchema);

const sectionsArray = resumeSchema.path('sections');
// inheritance
sectionsArray.discriminator('AchievementSection', achievementSchema);
sectionsArray.discriminator('ActivitySection', activitySchema);
sectionsArray.discriminator('CourseSection', courceSchema);
sectionsArray.discriminator('EducationSection', educationSchema);
sectionsArray.discriminator('ExperienceSection', experienceSchema);
sectionsArray.discriminator('SkillSection', skillSchema);
sectionsArray.discriminator('SummarySection', summarySchema);
sectionsArray.discriminator('TechnologySection', technologySchema);
sectionsArray.discriminator('VolunteerSection', volunteerSchema);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
