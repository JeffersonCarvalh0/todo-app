import Router from 'koa-router';
import userRouter from './UserRouter';
import todoRouter from './TodoRouter';

/**
 *  @swagger
 *
 *  tags:
 *    - name: "User"
 *      description: "User and authentication endpoints"
 *    - name: "Todo"
 *      description: Todo CRUD operations
 */
const router = new Router()
  .use('/api', userRouter.routes())
  .use('/api', todoRouter.routes());

export default router;
