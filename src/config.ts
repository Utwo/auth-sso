const config = {
  app_env: process.env.APP_ENV,
  port: process.env.AUTH_PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h',
    issuer: 'simple-sso',
  },
  database: {
    mongodb: {
      database: process.env.MONGODB_DATABASE,
      password: process.env.MONGODB_PASS,
      port: process.env.MONGODB_PORT,
      protocol: process.env.MONGODB_PROTOCOL,
      server: process.env.MONGODB_SERVER,
      user: process.env.MONGODB_USER,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  google: {
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:${process.env.AUTH_PORT}/auth/google/callback`,
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  github: {
    clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://localhost:${process.env.AUTH_PORT}/auth/github/callback`,
  },
  clients: [
    {
      name: 'sso_consumer1',
      token: 'l1Q7zkOL59cRqWBkQ12ZiGVW2DBL',
      authorizedRedirectURI: [],
    },
    {
      name: 'sso_consumer2',
      token: '1g0jJwGmRQhJwvwNOrY4i90kD0m',
      authorizedRedirectURI: ['http://localhost:3020/profile', 'http://localhost:3030'],
    },
  ],
}

export { config }
