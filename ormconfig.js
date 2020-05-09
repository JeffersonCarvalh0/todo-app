// connection string: postgres://username:password@host:port/database
const databaseURL =
  process.env.NODE_ENV === 'test'
    ? 'postgres://typeorm:password@localhost:5432/todo-test'
    : process.env.DATABASE_URL;

const dirs =
  process.env.NODE_ENV === 'production'
    ? {
        entities: [__dirname + '/packages/server/build/entity/*.js'],
        subscribers: ['/packages/server/build/subscriber/*.js'],
        migrations: ['/packages/server/build/migrations/*.js'],
      }
    : {
        entities: [__dirname + '/src/entity/*.ts'],
        subscribers: ['src/subscriber/*.ts'],
        migrations: ['src/migrations/*.ts'],
      };

module.exports = {
  type: 'postgres',
  url: databaseURL,
  logging: false,
  subscribers: dirs.subscribers,
  migrations: dirs.migrations,
  entities: dirs.entities,
  cli: {
    entitiesDir: './packages/server//src/entity',
    migrationsDir: './packages/server//src/migrations',
    subscribersDir: './packages/server//src/subscriber',
  },
};
