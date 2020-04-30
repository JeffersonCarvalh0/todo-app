import { Context } from 'koa';
import { validate } from 'class-validator';
import passport from 'koa-passport';
import jwt from 'jsonwebtoken';
import eres from 'eres';

import User, { getUserRepository } from '../entity/User';
import { hashPassword } from '../auth';

export default class UserController {
  static createNewUser = async (context: Context) => {
    const body = context.request.body;

    const newUser = new User({
      name: body.name,
      email: body.email,
      password: body.password ? await hashPassword(body.password) : '',
    });

    const validationErrors = await validate(newUser);
    const isNotValid = validationErrors.length > 0;
    const [saveError] = await eres(getUserRepository().save(newUser));

    context.response.status = isNotValid || saveError ? 400 : 201;

    const message = isNotValid
      ? 'Error during data validation'
      : saveError
      ? 'Error while saving data'
      : '';

    const errors =
      isNotValid && saveError
        ? [...validationErrors, saveError]
        : isNotValid || saveError
        ? [saveError] || validationErrors
        : [];

    context.body = {
      data: isNotValid || saveError ? {} : newUser.toJson(),
      message: message,
      errors: errors,
    };
  };

  static login = async (context: Context) => {
    passport.authenticate(
      'local',
      { session: false },
      (err: Error, user: User, info) => {
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
    );
  };

  static getUserInfo = async (context: Context) => {
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User, info) => {
        context.response.status = user ? 200 : 401;
        const responseData = user ? { password: '', ...user } : {};

        context.body = {
          data: responseData,
          message: info.message,
          errors: [err],
        };
      },
    );
  };

  static updateUser = async (context: Context) => {
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User, info) => {
        const body = context.request.body;

        user.name = body.name || user.name;
        user.email = body.email || user.email;
        user.password = body.password
          ? await hashPassword(body.password)
          : user.password;

        const errors = await validate(user);
        const foundErrors = errors.length > 0;
        const message =
          info.message ||
          (foundErrors ? 'Error during data validation' : null) ||
          '';

        context.body = {
          data: foundErrors ? {} : user.toJson(),
          message: message,
          errors: err ? [err] : errors,
        };
      },
    );
  };

  static deleteUser = async (context: Context) => {
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: Error, user: User, info) => {
        context.reponse.status = user ? 204 : 401;
        await getUserRepository().remove(user);

        context.body = {
          data: {},
          message: info.message,
          errors: [err],
        };
      },
    );
  };
}
