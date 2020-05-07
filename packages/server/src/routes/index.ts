import Router from 'koa-router';
import userRouter from './UserRouter';
import todoRouter from './TodoRouter';

const router = new Router()
  .use('/api', userRouter.routes())
  .use('/api', todoRouter.routes());

export default router;
