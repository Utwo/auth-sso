import { AccountModel } from '../model/account'

async function authenticate(email, password, done) {
  const user = await AccountModel.findOne({ email })
  if (!user || !user.passwordMatch(password)) {
    return done(null, false, { message: 'Email or password incorrect' })
  }
  return done(null, user.id)
}

async function createOrUpdate(accessToken, refreshToken, profile, done) {
  const email = profile.emails[0].value
  let user = await AccountModel.findOne({ email })
  if (!user) {
    user = new AccountModel()
  }
  user.email = email
  user.picture = profile.photos[0].value
  user.firstName = profile.name.givenName
  user.lastName = profile.name.familyName
  user[profile.provider] = {
    accessToken,
    refreshToken,
  }
  await user.save()
  return done(null, user.id)
}

export const userService = {
  authenticate,
  createOrUpdate,
}
