import {
  MAILTRAP_PASS,
  MAILTRAP_PORT,
  MAILTRAP_USER,
  MAILTRA_HOST,
} from '../shared/utils/environments';

export const mailConfig = {
  mailtrap: {
    host: MAILTRA_HOST,
    port: Number(MAILTRAP_PORT),
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASS,
    },
  },
};
