import dotenv from 'dotenv';
dotenv.config();

// application
export const { PORT, NODE_ENV } = process.env;

// typeorm
export const {
  TYPEORM_TYPE,
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} = process.env;
