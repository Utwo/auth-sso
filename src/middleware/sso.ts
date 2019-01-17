import { config } from '../config'

const validTokenAndRedirect = (req, res, next) => {
  if (!req.query.token || !req.query.redirectURI) {
    return res.status(400).json({ message: 'Token or redirectURI is missing' })
  }

  const client = config.clients.find((clientItem) => clientItem.token === req.query.token)
  if (!client) {
    return res.status(400).json({ message: 'Your are not allowed to access the auth server' })
  }

  const authorizedRedirectURI = client.authorizedRedirectURI.find((redirectURIItem) => redirectURIItem === req.query.redirectURI)
  if (!authorizedRedirectURI) {
    return res.status(400).json({ message: 'Your are not allowed to access the auth server' })
  }
  next()
}

export const ssoMiddleware = { validTokenAndRedirect }
