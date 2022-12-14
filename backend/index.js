import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import db from './src/models/index.js';
import soundRecordRouter from './src/routes/soundRecord.route.js';
import categoryRouter from './src/routes/category.route.js';
import statisticsRouter from './src/routes/statistics.route.js';
import authRouter from './src/routes/auth.route.js';

import upload, { acceptedFiles } from './src/middlewares/fileUpload.js';
import readCategoryData from './src/utils/readCategoryData.js';
import readCountryData from './src/utils/readCountryData.js';

const Category = db.models.Category;
const SubCategory = db.models.SubCategory;
const Country = db.models.Country;

// To Replicate __ dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8002;
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());

app.use('/api/soundRecord', upload.fields(acceptedFiles), soundRecordRouter);
app.use('/api/category', categoryRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/auth', authRouter);

// For sending image and audio files
app.get('/api/uploads/:filePath', (req, res) => {
  res.sendFile(__dirname + '/uploads/' + req.params.filePath);
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`${statusCode} - ${err.message}\n`, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.get('/', (req, res) => {
  res.send('<h1>Server is running</h1>');
});

const categoryData = readCategoryData(__dirname);
const countriesData = readCountryData(__dirname);

// { force: true }
db.sequelize.sync().then(() => {
// db.sequelize.sync({ force: true }).then(() => {
//   Category.bulkCreate(categoryData.categories, { validate: true }).then(() => {
//     SubCategory.bulkCreate(categoryData.subCategories, { validate: true }).then(() => {
//     Country.bulkCreate(countriesData.countries, { validate: true }).then(() => {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}.`)
      );
  //   });
  //   });
  // });
});
