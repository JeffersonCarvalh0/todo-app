import { Context, Next } from 'koa';
import { validate } from 'class-validator';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import eres from 'eres';

import User, { getUserRepository } from '../entity/User';
import { hashPassword } from '../auth';

export default class UserController {
  static upsertUser = async (user: User | false, info?) => {
    const validationErrors = await validate(user);
    const isNotValid = validationErrors.length > 0;

    const [saveError] = user
      ? await eres(getUserRepository().save(user))
      : [Error('Unauthorized user')];

    const infoMessage = info ? info.message : '';
    const message = !user
      ? infoMessage
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
    const data =
      isNotValid || saveError || !user ? {} : (user as User).toJson();
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

        context.response.status = err || !user ? 401 : 200;
        context.body = {
          data: token ? { token } : {},
          message: info ? info.message : '',
          errors: err ? [err] : [],
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
          message: info ? info.message : '',
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
        }

        const {
          data,
          message,
          errors,
          statusCode,
        } = await UserController.upsertUser(user, info);

        context.response.status = statusCode;
        context.body = {
          data: data,
          message: message,
          errors: errors,
        };
      },
    )(context, next);

  static updatePassword = async (context: Context, next: Next) =>
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User | false, info) => {
        const body = context.request.body;
        const requestError =
          !body.oldPassword || !body.newPassword || !body.newPasswordConfirm;

        const newPasswordMismatch =
          body.newPassword !== body.newPasswordConfirm;

        const incorrectOldPassword =
          user && !requestError
            ? !(await user.checkPassword(body.oldPassword))
            : true;

        const canUpdate =
          user &&
          !err &&
          !requestError &&
          !newPasswordMismatch &&
          !incorrectOldPassword;

        if (canUpdate) {
          (user as User).password = await hashPassword(body.newPassword);
        }

        const requestBodyError = Error('Invalid request body');
        const passwordMismatchError = Error('The passwords do not match');

        const [updateError] = canUpdate
          ? await eres(getUserRepository().save(user as User))
          : [requestBodyError];

        const infoMessage = info ? info.message : '';
        const message = err
          ? infoMessage
          : requestError
          ? requestBodyError.message
          : newPasswordMismatch
          ? passwordMismatchError.message
          : incorrectOldPassword
          ? 'Incorrect old password'
          : updateError
          ? updateError.message
          : '';

        const errors =
          err || !user
            ? [Error('Unauthorized user')]
            : requestError
            ? [requestBodyError]
            : newPasswordMismatch
            ? [passwordMismatchError]
            : updateError
            ? [updateError]
            : [];

        context.response.status = !user
          ? 401
          : !canUpdate || updateError
          ? 400
          : 200;

        context.body = {
          data: {},
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
        const [deleteError] = user
          ? await eres(getUserRepository().remove(user))
          : [Error('Unauthorized user')];

        const infoMessage = info ? info.message : '';
        const message = err
          ? infoMessage
          : deleteError
          ? deleteError.message
          : '';

        const errors =
          err && deleteError
            ? [err, deleteError]
            : err
            ? [err]
            : deleteError
            ? [deleteError]
            : [];

        context.response.status = user ? 200 : 401;
        context.body = {
          data: {},
          message: message,
          errors: errors,
        };
      },
    )(context, next);
}
