import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import sesion from '../src/sesion/sesion.routes.js'
import teacherRoutes from '../src/teacher/teacher.routes.js'
import { connect } from './mongo.js'
import { validateJwt, errorHandler } from '../src/middlewares/validate-jwt.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 2656

connect()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Rutas
app.use('/api/validate', sesion)
app.use('/teacher', teacherRoutes)
app.get('/', (req, res) => {
    res.send('Welcome to School')
})

app.use(validateJwt)

app.use(errorHandler)


export default app

