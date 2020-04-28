![Release(Server)](https://github.com/JeffersonCarvalh0/todo-app/workflows/Release(Server)/badge.svg)
# Server
The todo app server.

## Instructions
### Prerequisites
You will need to have [mysql installed](https://dev.mysql.com/doc/mysql-getting-started/en/).
In order to boot up the sever for development, create a new user that can be used
by the server, and update the credentials in the `ormconfig.json` files both in
root and in the server folder (the `ormconfig` file in the root is a workaround
needed because of the monorepo - there is an [open issue](https://github.com/typeorm/typeorm/issues/2805)
about that). After the user is created, create a new table to be used by the 
server and update it in the `ormconfig` files.

### Starting the server
Run `yarn start` to boot up the server, or `yarn start:server` if you are in the
monorepo's root.

### Migrations
The database can be updated by `yarn migration:generate` to generate a migration
file, and then `yarn migration:run` to apply it. `yarn migration:run` is also run
automatically when the server is started.

### Tests
`yarn test` or `yarn test:server` if you are in root.
