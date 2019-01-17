import { generateJwtToken } from '../lib/jwtHelper'

const login = (req, res) => {
  if (req.isAuthenticated()) {
    const jwtToken = generateJwtToken(req.user.id)
    return res.redirect(`${req.query.redirectURI}/?token=${jwtToken}`)
  }

  req.session.client = {
    redirectURI: req.query.redirectURI,
  }
  return res.render('login')
}

export const ssoController = { login }
