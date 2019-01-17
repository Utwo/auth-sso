import { generateJwtToken } from '../lib/jwtHelper'

async function google(req, res) {
  // const io = req.app.get('io')
  // io.in(req.session.socketId).emit(GOOGLE_PROVIDER, req.user)
  const jwtToken = await generateJwtToken(req.user.id)
  const client = req.session.client;
  delete req.session.client;
  res.redirect(`${client.redirectURI}/?token=${jwtToken}`)
}

async function github(req, res) {
  // const io = req.app.get('io')
  // io.in(req.session.socketId).emit(GITHUB_PROVIDER, req.user)
  const jwtToken = await generateJwtToken(req.user.id)
  const client = req.session.client;
  delete req.session.client;
  res.redirect(`${client.redirectURI}/?token=${jwtToken}`)
}

async function login(req, res) {
  // const io = req.app.get('io')
  // io.in(req.session.socketId).emit('login', req.user)
  const response = {
    user: req.user,
    token: await generateJwtToken(req.user.id)
  }
  res.json(response)
}

async function logout(req, res) {
  req.logout();
  req.session.destroy()
  res.end()
}

export const authController = { google, github, login, logout }
