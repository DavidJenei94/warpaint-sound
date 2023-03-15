import express from 'express';
import cors from 'cors';

import db from './src/models/index.js';
import config from './src/configs/general.config.js';
import soundRecordRouter from './src/routes/soundRecord.route.js';
import categoryRouter from './src/routes/category.route.js';
import statisticsRouter from './src/routes/statistics.route.js';
import authRouter from './src/routes/auth.route.js';
import mediaRouter from './src/routes/media.route.js';
import exportRouter from './src/routes/export.route.js';
import importRouter from './src/routes/import.route.js';

import upload, { acceptedFiles } from './src/middlewares/fileUpload.js';
import readCategoryData from './src/utils/readCategoryData.js';
import readCountryData from './src/utils/readCountryData.js';

const Category = db.models.Category;
const SubCategory = db.models.SubCategory;
const Country = db.models.Country;

const port = process.env.PORT || 8002;
const app = express();
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

if (config.environment === 'production') {
  app.use(
    cors({
      origin: [config.frontendUrl],
    })
  );
} else if (config.environment === 'development') {
  app.use(cors());
}

app.use('/api/soundRecord', upload.fields(acceptedFiles), soundRecordRouter);
app.use('/api/category', categoryRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/uploads', mediaRouter);
app.use('/api/export', exportRouter);
app.use('/api/import', importRouter);

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

const createDataTables = async () => {
  const categoryData = readCategoryData();
  const countriesData = readCountryData();

  await Category.sync({ force: true });
  await SubCategory.sync({ force: true });
  await Country.sync({ force: true });

  await Category.bulkCreate(categoryData.categories, {
    validate: true,
    ignoreDuplicates: true,
  });
  await SubCategory.bulkCreate(categoryData.subCategories, {
    validate: true,
    ignoreDuplicates: true,
  });
  await Country.bulkCreate(countriesData.countries, {
    validate: true,
    ignoreDuplicates: true,
  });
};

// { force: true }
db.sequelize
  .sync()
  .then(() => {
    createDataTables();
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port ${port}.`));
  });
