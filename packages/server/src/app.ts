import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

import router from './routes';

const runApp = (port?: string | number) => {
  const app = new Koa();

  /** Middlewares */
  app.use(helmet());
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  /** Routes */
  app.use(router.routes()).use(router.allowedMethods());

  if (port) app.listen(port);
  return app.callback();
};

export default runApp;
