import 'reflect-metadata';
import { createConnection } from 'typeorm';

import runApp from './app';

/** Database connection */
createConnection()
  .then(async (connection) => {
    const port = process.env.PORT || 3000;
    runApp(connection, port);
    console.info(`Listening to http://localhost:${port} 🚀`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
