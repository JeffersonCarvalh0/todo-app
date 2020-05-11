# Todo app
A todo app monorepo with web and server.
visit https://jeffersoncarvalh0.github.io/todo-app/ to see a live version
of the website, and https://todo-app-server0.herokuapp.com/docs to read the
server API docs online.

## Stack
### Web
![Release(Web)](https://github.com/JeffersonCarvalh0/todo-app/workflows/Release(Web)/badge.svg)
 - Typescript
 - React(with hooks)
 - Storybook
 - Styled components
 - Jest/React testing library

### Server
![Release(Server)](https://github.com/JeffersonCarvalh0/todo-app/workflows/Release(Server)/badge.svg)
 - Typescript
 - Koa
 - Typeorm
 - PostgreSQL
 - Jest

The monorepo is managed with Yarn Workspaces.

## Instructions
Make sure you are using node at version 12.0.0.
Run `yarn` in the root to install all dependencies. After this, you can

 - `yarn test` to run all tests
 - `yarn start` to run all apps

You can also run `yarn <command>:<workspace>` to run a command in a specific
workspace. See the package.json file scripts for more.

## License
Licensed under MIT. See [license](LICENSE) for details.
