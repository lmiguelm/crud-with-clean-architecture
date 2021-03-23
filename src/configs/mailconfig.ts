import {
  MAILTRAP_PASS,
  MAILTRAP_PORT,
  MAILTRAP_USER,
  MAILTRA_HOST,
  SENDGRID_API_KEY,
} from '../shared/utils/environments';

export const mailConfig = {
  sendgrid: {
    key: SENDGRID_API_KEY,
  },
  mailtrap: {
    host: MAILTRA_HOST,
    port: Number(MAILTRAP_PORT),
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  },
};
