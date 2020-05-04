import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { createConnection } from 'typeorm';

import router from './routes';

const start = async (port?: string | number) => {
  const app = new Koa();

  /** Middlewares */
  app.use(helmet());
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  /** Database connection */
  await createConnection()
    .then(() => console.log(`TypeORM successfully connected the database!`))
    .catch((error) => console.log('TypeORM connection error: ', error));

  /** Routes */
  app.use(router.routes()).use(router.allowedMethods());

  if (port) app.listen(port);
  return app;
};

export default start;
