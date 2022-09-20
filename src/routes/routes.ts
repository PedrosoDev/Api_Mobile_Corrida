import express from 'express'
import userRoutes from './user.routes'

export default express.Router()

    .use('/users', userRoutes)
