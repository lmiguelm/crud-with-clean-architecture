import { ConnectionOptions } from 'typeorm';

import {
  NODE_ENV,
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_TYPE,
  TYPEORM_USERNAME,
} from '../shared/utils/environments';

const options = {
  development: {
    type: 'sqlite',
    database: './src/shared/infra/databases/database.development.sqlite',
  },
  test: {
    type: 'sqlite',
    database: './src/shared/infra/databases/database.test.sqlite',
  },
  production: {
    type: TYPEORM_TYPE,
    host: TYPEORM_HOST,
    port: TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
  },
};

const typeormConfig: ConnectionOptions = {
  ...options[String(NODE_ENV)],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};

export default typeormConfig;
