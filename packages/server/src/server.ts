import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';

import runApp from './app';

/** Database connection */
createConnection()
  .then(async () => {
    const port = process.env.PORT || 3000;
    runApp(port);
    console.info(`Listening to http://localhost:${port} 🚀`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
