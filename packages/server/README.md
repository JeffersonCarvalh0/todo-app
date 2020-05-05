![Release(Server)](https://github.com/JeffersonCarvalh0/todo-app/workflows/Release(Server)/badge.svg)
# Server
The todo app server.

## Instructions
### Prerequisites
You will need to have [PostgreSQL](https://dev.mysql.com/doc/mysql-getting-started/en/) installed.
In order to boot up the sever for development, create a user named `typeorm`
with password `password`. After the user is created, create a new table named
`todo` to be used by the server.

### Starting the server
Run `yarn start` to boot up the server, or `yarn start:server` if you are in the
monorepo's root.

### Migrations
The database can be updated by `yarn migration:generate` to generate a migration
file, and then `yarn migration:run` to apply it. `yarn migration:run` is also run
automatically when the server is started.

### Tests
First, create a new table named `todo-test` in the database for the tests.
After that, run `yarn test` or `yarn test:server` if you are in root.
