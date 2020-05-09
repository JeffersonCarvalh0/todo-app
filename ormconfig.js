// connection string: postgres://username:password@host:port/database
const databaseURL =
  process.env.NODE_ENV === 'test'
    ? 'postgres://typeorm:password@localhost:5432/todo-test'
    : process.env.DATABASE_URL;

console.log(`root settings NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`root settings databaseURL: ${process.env.DATABASE_URL}`);

const dirs =
  process.env.NODE_ENV === 'production'
    ? {
        entities: [__dirname + '/build/entity/*.js'],
        subscribers: ['build/subscriber/*.js'],
        migrations: ['build/migrations/*.js'],
      }
    : {
        entities: ['src/entity/*.ts'],
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
    entitiesDir: './src/entity',
    migrationsDir: './src/migrations',
    subscribersDir: './src/subscriber',
  },
};
