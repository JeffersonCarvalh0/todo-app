import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import runApp from './app';

/** Database connection */
createConnection()
  .then(async () => {
    dotenv.load();
    const port = process.env.PORT || 3000;
    runApp(port);
    console.info(`Listening to http://localhost:${port} 🚀`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
