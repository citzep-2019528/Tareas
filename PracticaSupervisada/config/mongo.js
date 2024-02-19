'use strict'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Teacher from '../src/teacher/teacher.model.js'

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | try connecting')
        })
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.once('open', async () => {
            console.log('MongoDB | connected to database')
            // Crear nuevo maistro
            const teacher = await Teacher.findOne()
            if (!teacher) {
                const password = await bcrypt.hash('maistro123', 15)
                const defaultT = new Teacher({
                    name: 'defaultTeacher',
                    surname: 'default',
                    username: 'maistro',
                    password: password,
                    role: 'TEACHER',
                    versionKey: false
                })
                await defaultT.save();
                console.log('New teacher:', defaultT)
            }
        })
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to mongodb')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected')
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })

        console.log('Connected to MongoDB')
    } catch (err) {
        console.error('Database connection failed', err)
    }
}

