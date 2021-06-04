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
const _ = require('lodash');
var slugify = require('slugify');

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
    position: String,
    tags: [String],
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

// {{url}}/api/v1/resumes?tags[in][]=javascript&tags[in][]=nextjs
// {{url}}/api/v1/job?slugs[all]=reactjs&slugs[all]=Nodejs

resumeSchema.pre('save', function (next) {
  const techSection = _.filter(this.sections, {
    record: 'TechnologySection',
  })[0];
  const tags = _.map(techSection.items, (item) => item.tags);
  const tagArr = _.flattenDepth(tags);
  const unixTagArr = _.uniq(tagArr);
  const finalTech = _.map(unixTagArr, (item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );
  console.log(finalTech);
  this.position = this.header.title;
  this.tags = finalTech;
  next();
});

resumeSchema.post('findOneAndUpdate', function (doc, next) {
  const techSection = _.filter(doc.sections, {
    record: 'TechnologySection',
  })[0];
  const tags = _.map(techSection.items, (item) => item.tags);
  const tagArr = _.flattenDepth(tags);
  const unixTagArr = _.uniq(tagArr);
  const finalTech = _.map(unixTagArr, (item) =>
    slugify(item, { lower: true, locale: 'vi' })
  );
  console.log(finalTech);
  doc.position = doc.header.title;
  doc.tags = finalTech;
  doc.save();
  next();
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
