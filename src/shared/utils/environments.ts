import dotenv from 'dotenv';
dotenv.config();

// application
export const { PORT, NODE_ENV, MAIL_PROVIDER, MAIL, NAME } = process.env;

// typeorm
export const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;

// mailtrap
export const { MAILTRA_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } = process.env;
