import { Context } from 'koa';
import { validate } from 'class-validator';
import passport from 'koa-passport';

import User, { UserRepository } from '../entity/User';
import { hashPassword } from '../auth';

export default class UserController {
  static createNewUser = async (context: Context) => {
    const body = context.request.body;
    const newUser = new User({
      name: body.name,
      email: body.email,
      password: await hashPassword(body.password),
    });
    const errors = await validate(newUser);
    const foundErrors = errors.length > 0;

    context.response.status = foundErrors ? 201 : 400;
    if (!foundErrors) {
      await UserRepository.save(newUser);
    }

    context.body = {
      data: foundErrors ? {} : newUser.toJson(),
      message: foundErrors ? 'Error during data validation' : '',
      errors: errors,
    };
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
          errors: err ? [err] : [errors],
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
        await UserRepository.remove(user);

        context.body = {
          data: {},
          message: info.message,
          errors: [err],
        };
      },
    );
  };
}
