const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const _ = require('lodash');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const { cloudinary } = require('./utils/cloudinary');
const Job = require('./models/JobModel');
const Resume = require('./models/ResumeModel');
const catchAsync = require('./utils/catchAsync');

// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');
// const reviewRouter = require('./routes/reviewRoutes');
// const bookingRouter = require('./routes/bookingRoutes');
// const bookingController = require('./controllers/bookingController');
// const viewRouter = require('./routes/viewRoutes');

// Start express app
const app = express();

app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.ld.com, front-end ld.com
// app.use(cors({
//   origin: 'https://www.ldcv.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // 'tags',
      // 'slugs',
      // 'and',
      // 'or',
      // 'all',
      // 'in',
      // 'and',
      // 'ne',
      'or',
      'slugs',
      'position',
      // 'in',
      // 'or',
      // 'and',
      // 'position',
      // 'elemMatch',
    ],
  })
);

// HPP Helpfull

app.use(compression());

// serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

app.use('/api/v1/upload', async (req, res) => {
  try {
    let fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'company',
    });
    res.json({ status: 'success', url: uploadResponse.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'fail', msg: 'Uploading fail' });
  }
});

app.use(
  '/api/v1/suggest/:id',
  catchAsync(async (req, res) => {
    console.log(req.params);
    const job = await Job.findById(req.params.id).select({
      title: 1,
      createdAt: 1,
      tags: 1,
      slugs: 1,
      company: 0,
    });
    const resumes = await Resume.find().select({ position: 1, tags: 1 });
    const job80 = resumes.filter((cv) => {
      const intersection = _.intersection(cv.tags, job.slugs);
      return intersection.length >= job.slugs.length * 0.8;
    });

    const job30 = resumes.filter((cv) => {
      const intersection = _.intersection(cv.tags, job.slugs);
      return (
        intersection.length >= job.slugs.length * 0.3 &&
        intersection.length < job.slugs.length * 0.8
      );
    });

    res.json({
      status: 'success',
      data: {
        job,
        job30,
        job80,
      },
    });
  })
);

app.use(
  '/api/v1/helper/:id',
  catchAsync(async (req, res) => {
    console.log(req.params);
    const resume = await Resume.findById(req.params.id);
    const jobs = await Job.find().select({ slugs: 1, position: 1, company: 0 });
    const math80 = jobs.filter((job) => {
      const intersection = _.intersection(job.slugs, resume.tags);
      return intersection.length >= resume.tags.length * 0.8;
    });
    console.log(resume.user);
    const math30 = jobs.filter((job) => {
      const intersection = _.intersection(job.slugs, resume.tags);
      return intersection.length >= resume.tags.length * 0.3;
    });
    res.json({
      status: 'success',
      job30: math30,
      math80,
    });
  })
);

// 3) ROUTES
// app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resumes', require('./routes/resumeRoutes'));
app.use('/api/v1/companies', require('./routes/companyRoutes'));
app.use('/api/v1/job', require('./routes/jobRoutes'));
app.use('/api/v1/notification', require('./routes/notificationRoutes'));
app.use('/api/v1/applies', require('./routes/applyRoutes'));
app.use('/api/v1/reviews', require('./routes/reviewRoutes'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
