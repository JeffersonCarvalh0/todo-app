// connection string: postgres://username:password@host:port/database
const databaseURL =
  process.env.NODE_ENV === 'test'
    ? 'postgres://typeorm:password@localhost:5432/todo-test'
    : process.env.DATABASE_URL;

const dirs =
  process.env.NODE_ENV === 'production'
    ? {
        entities: [__dirname + '/build/entity/*.js'],
        subscribers: ['build/subscriber/*.js'],
      }
    : {
        entities: ['src/entity/*.ts'],
        subscribers: ['src/subscriber/*.ts'],
      };

module.exports = {
  type: 'postgres',
  url: databaseURL,
  logging: false,
  subscribers: dirs.subscribers,
  entities: dirs.entities,
  migrations: 'src/migrations/*.ts',
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/migrations',
    subscribersDir: './src/subscriber',
  },
};
