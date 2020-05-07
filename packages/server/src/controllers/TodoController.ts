import { Context, Next } from 'koa';
import { validate } from 'class-validator';
import passport from 'koa-passport';
import eres from 'eres';

import User from '../entity/User';
import Todo, { getTodoRepository } from '../entity/Todo';

export default class TodoController {
  static upsertTodo = async (todo: Todo, user: User | false, info?) => {
    const validationErrors = await validate(todo);
    const isNotValid = validationErrors.length > 0;

    const [saveError] = user
      ? await eres(getTodoRepository().save(todo))
      : [Error('Unauthorized user')];

    const message = !user
      ? info.message
      : isNotValid
      ? 'Error during data validation'
      : saveError
      ? 'Error while saving data'
      : '';

    const errors = !user
      ? [Error('Unauthorized user')]
      : isNotValid && saveError
      ? [...validationErrors, saveError]
      : isNotValid
      ? validationErrors
      : saveError
      ? [saveError]
      : [];

    const statusCode = !user ? 401 : isNotValid || saveError ? 400 : 201;
    const data = isNotValid || saveError || !user ? {} : todo.toJson();
    return { message, errors, statusCode, data };
  };

  static createNewTodo = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        if (err) console.log(err);
        const body = context.request.body;

        const newTodo = new Todo({
          title: body.title,
          description: body.description,
          done: body.done,
          createdBy: user ? user : undefined,
        });

        const {
          data,
          message,
          statusCode,
          errors,
        } = await TodoController.upsertTodo(newTodo, user, info);

        context.response.status = statusCode;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static getTodo = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const [getTodoError, todo] = await eres(
          getTodoRepository().findOne({
            id: context.params.id,
          }),
        );

        const authError =
          !user || (!getTodoError && todo.createdBy.id !== user.id);
        const data = !getTodoError && !authError ? todo.toJson() : {};
        const message = err
          ? info.message
          : getTodoError
          ? getTodoError.message
          : authError
          ? 'Unauthorized user'
          : '';

        const errors = err
          ? [err]
          : authError
          ? [Error('Unauthorized user')]
          : getTodoError
          ? [getTodoError]
          : [];

        context.response.status = authError ? 401 : getTodoError ? 400 : 200;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static getTodos = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const data = user ? user.todos.map((todo) => todo.toJson()) || [] : [];
        const message = !user ? info.message : '';
        const errors = !user ? Error('Unauthorized user') : [];

        context.response.status = user ? 200 : 401;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static updateTodo = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const [getTodoError, todo] = await eres(
          getTodoRepository().findOne({
            id: context.params.id,
          }),
        );

        const updatedTodo = todo
          ? getTodoRepository().merge(todo, context.request.body)
          : {};

        const authError =
          !user || (!getTodoError && todo.createdBy.id !== user.id);

        console.log(user);
        const { data, message, errors, statusCode } =
          todo && !authError
            ? await TodoController.upsertTodo(updatedTodo as Todo, user, info)
            : {
                data: {},
                message: authError ? 'Unauthorized user' : getTodoError.message,
                errors: authError
                  ? [Error('Unauthorized user')]
                  : [getTodoError],
                statusCode: authError ? 401 : 404,
              };

        context.response.status = statusCode == 201 ? 200 : statusCode;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static deleteTodo = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const [getTodoError, todo] = await eres(
          getTodoRepository().findOne({
            id: context.params.id,
          }),
        );

        const authError = !user || (todo && todo.createdBy.id !== user.id);
        const [deleteError] = authError
          ? [Error('Unauthorized user')]
          : await eres(getTodoRepository().remove(todo));

        const message = err
          ? info.message
          : authError
          ? 'Unauthorized user'
          : getTodoError
          ? getTodoError.message
          : deleteError
          ? deleteError.message
          : '';

        const errors = err
          ? [err]
          : authError
          ? [Error('Unauthorized user')]
          : getTodoError
          ? [getTodoError]
          : deleteError
          ? [deleteError]
          : [];

        context.response.status = authError ? 401 : deleteError ? 400 : 200;
        context.body = {
          data: {},
          message: message,
          errors: errors,
        };
      },
    )(context, next);
}
