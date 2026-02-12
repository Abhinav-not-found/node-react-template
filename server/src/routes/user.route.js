import express from 'express'
import { login, register, getUserInfo, logout } from '../controllers/user.controller.js'
import authenticateToken from '../middlewares/user.middleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/getUserInfo', authenticateToken, getUserInfo)


router.get('/check', (req, res) => {
  res.send('User route is running')
})

export default router
