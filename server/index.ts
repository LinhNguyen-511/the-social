import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors';

import userRouter from  "./routes/posts"
import authRouter from  "./routes/auth"


// ENVIRONMENT VARIABLES
dotenv.config({ path: '../.env'})
const MongoURL: string = process.env.MONGO_URL 

// EXPRESS: create   
const app: Application = express()
const port = 4000

//MONGOOSE
mongoose.connect(MongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
    console.log('Connected to Mongo')
})

// MIDDLEWARE
// enable ALL cors request
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// set HTTPS headers
app.use(helmet())
// print out the res of req
app.use(morgan("common"))

// ROUTES
app.use('/posts', userRouter)
app.use('/api/auth', authRouter)


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`)
    })
} catch (error) {
    console.error(`Error occured: ${error.message}`)
}