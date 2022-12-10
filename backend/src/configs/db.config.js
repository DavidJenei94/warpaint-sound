const env = process.env;

const db = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  name: env.DB_NAME || 'WarpaintSound',
  port: env.DB_PORT || 5432,
  dialect: env.DB_DIALECT,
};

export default db;
