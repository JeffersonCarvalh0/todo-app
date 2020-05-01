import { Context, Next } from 'koa';
import { validate } from 'class-validator';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import eres from 'eres';

import User, { getUserRepository } from '../entity/User';
import { hashPassword } from '../auth';

export default class UserController {
  static upsertUser = async (user: User | false, authError?: Error, info?) => {
    const validationErrors = await validate(user);
    const isNotValid = validationErrors.length > 0;
    const [saveError] = user
      ? await eres(getUserRepository().save(user))
      : [Error('Unauthorized user')];

    const message = authError
      ? info.message
      : isNotValid
      ? 'Error during data validation'
      : saveError
      ? 'Error while saving data'
      : '';

    const errors = authError
      ? [authError]
      : isNotValid && saveError
      ? [...validationErrors, saveError]
      : isNotValid
      ? validationErrors
      : saveError
      ? [saveError]
      : [];

    const statusCode = isNotValid || saveError || authError ? 400 : 201;

    const data =
      isNotValid || saveError || authError ? {} : (user as User).toJson();

    return { message, errors, statusCode, data };
  };

  static createNewUser = async (context: Context) => {
    const body = context.request.body;

    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password ? await hashPassword(body.password) : '',
    });

    const {
      data,
      message,
      statusCode,
      errors,
    } = await UserController.upsertUser(newUser);

    context.response.status = statusCode;
    context.body = {
      data: data,
      message: message,
      errors: errors,
    };
  };

  static login = async (context: Context, next: Next) =>
    passport.authenticate(
      'local',
      { session: false },
      (err: Error, user: User | false, info) => {
        const token = user
          ? jwt.sign(user.toJson(), process.env.JWTSECRET, { expiresIn: '15m' })
          : null;

        context.response.status = err ? 401 : 200;
        context.body = {
          data: { token },
          message: info.message,
          error: [err],
        };
      },
    )(context, next);

  static getUserInfo = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        context.response.status = user ? 200 : 401;
        const responseData = user ? user.toJson() : {};

        context.body = {
          data: responseData,
          message: info.message,
          errors: [err],
        };
      },
    )(context, next);

  static updateUser = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const body = context.request.body;

        if (user) {
          user.name = body.name || user.name;
          user.email = body.email || user.email;
          user.password = body.password
            ? await hashPassword(body.password)
            : user.password;
        }

        const {
          data,
          message,
          errors,
          statusCode,
        } = await UserController.upsertUser(user, err, info);

        context.response.status = statusCode;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static deleteUser = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        context.reponse.status = user ? 204 : 401;

        const [deleteError] = user
          ? await eres(getUserRepository().remove(user))
          : [Error('Unauthorized user')];

        const message = err
          ? info.message
          : deleteError
          ? 'Error while deleting'
          : '';

        const errors =
          err && deleteError
            ? [err, deleteError]
            : err
            ? [err]
            : deleteError
            ? [deleteError]
            : [];

        context.body = {
          data: {},
          message: message,
          errors: errors,
        };
      },
    )(context, next);
}
