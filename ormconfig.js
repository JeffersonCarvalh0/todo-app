// connection string: postgres://username:password@host:port/database
const databaseURL = (() => {
  switch(process.env.NODE_ENV) {
    case "production": return process.env.DATABASE_URL;
    case "development": return "postgres://typeorm:password@localhost:5432/todo";
    case "test": return "postgres://typeorm:password@localhost:5432/todo-test";
  }
})()

module.exports = {
  "type": "postgres",
  "url": databaseURL,
  "logging": false,
  "entities": [
    "src/entity/*.js"
  ],
  "subscribers": [
    "src/subscriber/*.ts"
  ],
  "migrations": [
    "src/migrations/*.ts"
  ],
  "entities": [
    "src/entity/*.ts"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migrations",
    "subscribersDir": "src/subscriber"
  }
}
