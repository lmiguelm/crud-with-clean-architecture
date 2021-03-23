'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _environments = require('../shared/utils/environments');

const options = {
  development: {
    type: 'sqlite',
    database: './dist/shared/infra/databases/database.development.sqlite',
  },
  test: {
    type: 'sqlite',
    database: './dist/shared/infra/databases/database.test.sqlite',
  },
  production: {
    type: _environments.TYPEORM_TYPE,
    host: _environments.TYPEORM_HOST,
    port: _environments.TYPEORM_PORT,
    username: _environments.TYPEORM_USERNAME,
    password: _environments.TYPEORM_PASSWORD,
    database: _environments.TYPEORM_DATABASE,
  },
};
const typeormConfig = {
  ...options[String(_environments.NODE_ENV)],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  cli: {
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
};
var _default = typeormConfig;
exports.default = _default;
