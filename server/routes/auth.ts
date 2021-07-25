import express from 'express';
import bcrypt from 'bcrypt';

import User from "./../models/User";

const router = express.Router()

router.get('/register', async (req: express.Request, res: express.Response): Promise<express.Response> => {

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        

        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await user.save()
        return res.status(200).json(user)
    } catch(e) {
        console.log(e)
    }
    

})

export default router;