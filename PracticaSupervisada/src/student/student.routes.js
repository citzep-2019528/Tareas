import express from 'express'
import { assign, viewCourses, update, deleteE } from '../controllers/student.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const router = express.Router()

router.post('/courses/:courseId/assign', validateJwt, assign)

router.get('/courses', validateJwt, viewCourses)

router.put('/profile', validateJwt, update)

router.delete('/profile', validateJwt, deleteE)

export default router
