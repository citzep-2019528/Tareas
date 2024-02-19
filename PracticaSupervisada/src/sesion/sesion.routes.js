import express from 'express'
import { validateJwt } from   '../middlewares/validate-jwt.js'
import { registerS, registerT, login } from '../utils/validator.js'

const api = express.Router()

api.post('/register/student', registerS)

api.post('/register/teacher', validateJwt, registerT)

api.post('/login',  login)

export default api
