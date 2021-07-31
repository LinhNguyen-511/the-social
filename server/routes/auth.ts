// this file handles both signing in and signing up operations 
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import User from "./../models/User";
import { access } from 'fs';

// ENVIRONMENT VARIABLES
dotenv.config({ path: '../.env'})
const router = express.Router()

// this stores the refreshToken of many users
let refreshTokens: any = []
router.post('/token', async (req: express.Request, res: express.Response): Promise<express.Response> => {
    const refreshToken = req.body.refreshToken
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err: Error, user: any) => {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.username })
        res.json({ accessToken: accessToken })

    })
})

// LOGOUT
router.delete('/logout', async (req: express.Request, res: express.Response): Promise<void> => {
    // delete the refresh token of this user 
    // TODO: user have to send their refreshToken to this route
    refreshTokens = refreshTokens.filter((token: any) => token !== req.body.token)
    res.sendStatus(204)
})

// SIGN UP
router.post('/register', async (req: express.Request, res: express.Response): Promise<express.Response> => {
    console.log('register')
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }).save()

        return res.status(200).json(user)
    } catch(e) {
        console.log(e)
    }
})


// LOGIN 
router.post('/login', async (req: express.Request, res: express.Response): Promise<void> => { 
    console.log('login')

    try {
        // find the user with the username 
        const user = await User.findOne({username: req.body.username}).exec();
        
        // create jwt
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        // TODO: store the refresh token -> should be in a database
        refreshTokens.push(refreshToken)

        
        // compare the password input with the password of the user saved in db
        const result = await bcrypt.compare(req.body.password, user.password);
        if(result) {
            console.log('Correct!')
            res.json({ accessToken: accessToken, refreshToken: refreshToken })    
        } else {
            res.send('Wrong credentials')
        }
       
    } catch(e) {
        console.log(e)
    }

})

function generateAccessToken(user: any) {
    return jwt.sign(user.toJSON(), process.env.SECRET_TOKEN, {expiresIn: '30m'})
}

function generateRefreshToken(user: any) {
    return jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN)
}

export default router;