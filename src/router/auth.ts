import express from 'express'
import passport from 'passport'
import { authController } from '../controller/authController'
const authRouter = express.Router()

// Setting up the passport middleware for each of the OAuth providers
const loginAuth = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' })
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'], failureRedirect: '/login' })
const githubAuth = passport.authenticate('github')

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
authRouter.get('/google/callback', googleAuth, authController.google)
authRouter.get('/github/callback', githubAuth, authController.github)

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
authRouter.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})

// Routes that are triggered on the client
authRouter.post('/login', loginAuth)
authRouter.get('/logout', authController.logout)
authRouter.get('/google', googleAuth)
authRouter.get('/github', githubAuth)

export { authRouter }
