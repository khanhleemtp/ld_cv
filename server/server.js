const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
    autoIndex: true,
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
