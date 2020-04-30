import Koa, { DefaultState, Context } from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';

const runApp = (port?: string | number) => {
  const app = new Koa();

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
  const router = new Router<DefaultState, Context>();

  /** Middlewares */
  app.use(helmet());
  app.use(json());
  app.use(logger());
  app.use(bodyParser());

  /** Routes */
  app.use(router.routes()).use(router.allowedMethods());

  router.get('/', async (ctx: Koa.Context) => {
    ctx.body = { message: 'Automatically deployed with github actions!!!' };
  });

  router.post('/data', async (ctx: Koa.Context) => {
    ctx.body = {
      message:
        'This is your POST route, attached you can find the data you sent',
      body: ctx.request.body,
    };
  });

  if (port) app.listen(port);
  return app.callback();
};

export default runApp;
