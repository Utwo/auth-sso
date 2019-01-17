import express from 'express'
import http from 'http'
import engine from 'ejs-mate'
import session from 'express-session'
import redisStore from 'connect-redis';
import passport from 'passport'
import { passportInit } from './service/passportService'
import socketio from 'socket.io'
import { homeRouter } from './router/home'
import { ssoRouter } from './router/sso'
import { config } from './config'
import { createMongooseConnection } from './database'
import { authRouter } from './router/auth'

const app = express()
const server = http.createServer(app)

const RedisStore = redisStore(session)
const sess = session({
  store: new RedisStore(config.redis),
  name: 'auth-server',
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
})

if (config.app_env === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true
}
app.use(sess)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())
passportInit()

app.engine('ejs', engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

createMongooseConnection()

const io = socketio(server)
app.set('io', io)

app.use('/', homeRouter)
app.use('/sso', ssoRouter)
app.use('/auth', authRouter)

app.listen(config.port, () => {
  console.info(`auth-server listening on port ${config.port}`)
})
