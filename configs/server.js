"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import courseRoutes from "../src/course/course.routes.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}


const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}


const routes = (app) => {
    app.use("/educativePlatform/v1/auth", authRoutes)
    app.use("/educativePlatform/v1/user", userRoutes)
    app.use("/educativePlatform/v1/course", courseRoutes)
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}