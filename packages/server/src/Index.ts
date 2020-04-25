import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();
const PORT = 3000;

/** Middlewares */
app.use(json());
app.use(logger());
app.use(bodyParser());

/** Routes */
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx: Koa.Context) => {
  ctx.body = { message: 'This is your GET route' };
});

router.post('/data', async (ctx: Koa.Context) => {
  ctx.body = {
    message: 'This is your POST route, attached you can find the data you sent',
    body: ctx.request.body,
  };
});

app.listen(PORT, () => console.log('Server started.'));
