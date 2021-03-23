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
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
  },
};

module.exports = {
  ...options[process.env.NODE_ENV],
  migrations: [process.env.MIGRATIONS],
  entities: [process.env.ENTITIES],
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
};
