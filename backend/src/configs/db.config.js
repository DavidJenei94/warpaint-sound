const env = process.env;

const db = {
  host: env.RDS_HOSTNAME || env.DB_HOST,
  user: env.RDS_USERNAME ||env.DB_USER,
  password: env.RDS_PASSWORD || env.DB_PASSWORD,
  name: env.RDS_DB_NAME || env.DB_NAME || 'warpaintsound',
  port: env.RDS_PORT || env.DB_PORT || 5432,
  dialect: env.DB_DIALECT || "postgres",
};

export const adminPassword = db.password;
export default db;
