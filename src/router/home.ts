import express from 'express'

const homeRouter = express.Router()

homeRouter.get('/', (req, res) => {
  const userEmail = req.isAuthenticated() ? req.user.email : 'Please login first'
  res.render('index', {
    heading: `${userEmail}`,
  })
})

export { homeRouter }
