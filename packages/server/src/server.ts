import 'reflect-metadata';
import { createConnection } from 'typeorm';

import app from './app';

/** Database connection */
createConnection()
  .then(async (_) => {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.info(`Listening to http://localhost:${port} 🚀`);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
