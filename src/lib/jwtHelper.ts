import jwt from 'jsonwebtoken'
import { config } from '../config'

function generateJwtToken(payload) {
  return jwt.sign({data: payload}, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    issuer: config.jwt.issuer,
  })
}

export { generateJwtToken }
