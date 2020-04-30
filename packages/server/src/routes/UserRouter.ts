import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import UserController from '../controllers/UserController';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const userRouter = new Router<DefaultState, Context>()
  .post('/login', (ctx) => UserController.login(ctx))
  .post('/user', (ctx) => UserController.createNewUser(ctx))
  .get('/user', (ctx) => UserController.getUserInfo(ctx))
  .put('/user', (ctx) => UserController.updateUser(ctx))
  .del('/user', (ctx) => UserController.login(ctx));

export default userRouter;
