import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import TodoController from '../controllers/TodoController';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36161#issuecomment-571295417
const todoRouter = new Router<DefaultState, Context>()
  .post('/todo', (ctx, next) => TodoController.createNewTodo(ctx, next))
  .get('/todo', (ctx, next) => TodoController.getTodos(ctx, next))
  .get('/todo/:id', (ctx, next) => TodoController.getTodo(ctx, next))
  .put('/todo/:id', (ctx, next) => TodoController.updateTodo(ctx, next))
  .del('/todo/:id', (ctx, next) => TodoController.deleteTodo(ctx, next));

export default todoRouter;
