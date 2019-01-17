import express from 'express'
import { ssoController } from '../controller/ssoController'
import { ssoMiddleware } from '../middleware/sso'
import { authMiddleware } from '../middleware/auth'

const ssoRouter = express.Router()

ssoRouter.get('/login', authMiddleware.isLoggedOut, ssoMiddleware.validTokenAndRedirect, ssoController.login)

export { ssoRouter }
