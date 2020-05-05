import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import UserController from '../controllers/UserController';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const userRouter = new Router<DefaultState, Context>()
  .post('/login', (ctx, next) => UserController.login(ctx, next))
  .post('/user', (ctx) => UserController.createNewUser(ctx))
  .get('/user', (ctx, next) => UserController.getUserInfo(ctx, next))
  .put('/user', (ctx, next) => UserController.updateUser(ctx, next))
  .put('/user/password', (ctx, next) =>
    UserController.updatePassword(ctx, next),
  )
  .del('/user', (ctx, next) => UserController.deleteUser(ctx, next));

export default userRouter;
