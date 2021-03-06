import Passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User, { getUserRepository } from './entity/User';

export const hashPassword = async (plainTextPassword: string) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 12);
  return hashedPassword;
};

// Set local strategy for authentication with username/password
Passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    getUserRepository()
      .findOne({ relations: ['todos'], where: { email } })
      .then(async (user: User | null) => {
        if (!user) {
          return done(null, false, { message: 'Invalid credentials' });
        }

        return (await user.checkPassword(password))
          ? done(null, user, { message: 'Successfully authenticated' })
          : done(null, false, { message: 'Invalid credentials' });
      })
      .catch((err: Error) => {
        return done(err);
      });
  }),
);

// Set local strategy for Json web tokens
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSECRET,
};
Passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    getUserRepository()
      .findOne({ relations: ['todos'], where: { email: jwtPayload.email } })
      .then((user: User | null) => {
        if (!user) {
          return done(null, false, {
            message: 'Invalid token payload data',
          });
        }
        return done(null, user);
      })
      .catch((err: Error) => {
        return done(err);
      });
  }),
);
