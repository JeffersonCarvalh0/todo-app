import Router from 'koa-router';
import userRouter from './UserRouter';

const router = new Router().use('/api', userRouter.routes());

export default router;
