import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GithubStrategy } from 'passport-github'
import {Strategy as LocalStrategy} from 'passport-local'
import { config } from '../config'
import { AccountModel } from '../model/account'
import { userService } from './userService'

const passportInit = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((id, done) => done(null, id))
  passport.deserializeUser(async (userId, done) => AccountModel.findById(userId, (err, user) => done(err, user)))

  // Adding each OAuth provider's strategy to passport
  passport.use(new LocalStrategy(userService.authenticate))
  passport.use(new GoogleStrategy(config.google, userService.createOrUpdate))
  passport.use(new GithubStrategy(config.github, userService.createOrUpdate))
}

export { passportInit }
