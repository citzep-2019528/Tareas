import express from 'express'
import { createCourse, deleteC, getCourses, updateCourse} from './teacher.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/courses/create',  createCourse)

api.put('/courses/:id', validateJwt, updateCourse)

api.delete('/courses/:id', validateJwt, deleteC)

api.get('/courses', validateJwt, getCourses)

export default api
