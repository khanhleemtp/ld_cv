const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Resume } = require('./models/ResumeModel');
const SummarySection = require('./models/ResumeSectionSchema/SummaryModel');
const TechnologySection = require('./models/ResumeSectionSchema/TechnologyModel');
const ActivitySection = require('./models/ResumeSectionSchema/ActivityModel');
const AchievementSection = require('./models/ResumeSectionSchema/AchievementModel');
const CourceSection = require('./models/ResumeSectionSchema/CourceModel');
const EducationSection = require('./models/ResumeSectionSchema/EducationModel');
const ExperienceSection = require('./models/ResumeSectionSchema/ExperienceModel');
const SkillSection = require('./models/ResumeSectionSchema/SkillModel');
const VolunteerSection = require('./models/ResumeSectionSchema/VolunteerModel');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// const sumary = new SummarySection({
//   name: 'Tổng kết',
//   items: [
//     {
//       text: 'LD',
//     },
//     {
//       text: 'Khanh',
//     },
//   ],
// });

// const resume = new Resume({
//   title: 'LDK',
// });
// const tech = new TechnologySection({
//   name: 'RockLee',
//   items: [
//     {
//       title: 'LD',
//       showTitle: true,
//       showDescription: false,
//       tags: ['Abc', 'Def'],
//     },
//   ],
// });

// Promise.all([
//   tech.save({ suppressWarning: true }),
//   sumary.save({ suppressWarning: true }),
// ]).then(() => {
//   resume.sections.push(tech);
//   resume.sections.push(sumary);
//   resume.save().then((data) => console.log(data));
// });

// Promise.all([sumary.save(), tech.save()])
//   .then(() => BaseSection.countDocuments())
//   .then((count) => console.log(count));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 🔺Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
