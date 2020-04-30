import Passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User, { UserRepository } from './entity/User';

export const hashPassword = async (plainTextPassword: string) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 12);
  return hashedPassword;
};

// Set local strategy for authentication with username/password
Passport.use(
  new LocalStrategy((email, plainTextPassword, done) => {
    UserRepository.findOne({ email })
      .then((user: User | null) => {
        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }
        bcrypt.compare(
          plainTextPassword,
          user.password,
          (err: Error, isMatch: boolean) => {
            if (err) {
              throw err;
            }
            if (!isMatch) {
              return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user, { message: 'Successfully authenticated' });
          },
        );
      })
      .catch((err: Error) => done(err));
  }),
);

// Set local strategy for Json web tokens
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSECRET,
};
Passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    UserRepository.findOne({ name: jwtPayload.name })
      .then((user: User | null) => {
        if (!user) {
          return done(null, false, {
            message: 'Invalid username from the token',
          });
        }
        return done(null, user, { message: 'Successfully authenticated' });
      })
      .catch((err: Error) => done(err));
  }),
);
