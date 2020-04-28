import Koa from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

/** Middlewares */
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
    message: 'This is your POST route, attached you can find the data you sent',
    body: ctx.request.body,
  };
});

export default app;
