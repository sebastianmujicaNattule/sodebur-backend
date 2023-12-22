import dotenv from 'dotenv';
import { PassportStatic } from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../domain/models/user';
import { FindByIdUser } from '../../domain/use-cases/user/find-by-id'

export default (passport: PassportStatic) => {
  dotenv.config();
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'jvns',
  },
  (payload, done) => {
    const findByIdUseCase= new FindByIdUser(payload)  
    const user =  findByIdUseCase.execute(payload)
      if (user) {
        return done(null, user);
      }else{
        return done({ error: 'No encontrado' }, false);
      }   
  }));
};

