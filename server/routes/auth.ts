// this file handles both signing in and signing up operations 
import express from 'express';
import bcrypt from 'bcrypt';

import User from "./../models/User";

const router = express.Router()

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
router.post('/login', async (req: express.Request, res: express.Response): Promise<express.Response> => { 
    console.log('login')

    try {
        // find the user with the username 
        const user = await User.findOne({username: req.body.username}).exec();
        console.log(user)
        // compare the password input with the password of the user saved in db
        const result = await bcrypt.compare(req.body.password, user.password);

        if(result) {
            return user
        }
        return 

    } catch(e) {
        console.log(e)
    }

})


export default router;