import express from 'express';
import jwt from "jsonwebtoken";

const router = express.Router()

const posts = [
    {
        username: 'linh',
        title: 'Linh\'s post'
    }, {
        username: 'notLinh',
        title: 'Not Linh\'s post'
    }
]

router.get('/', authenticateToken, (req: express.Request, res: express.Response): any => {
    res.json(posts.filter(p => p.username === req.body.username))
})

// create a middleware to authorize logged in user 
function authenticateToken (req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization']
    // authHeader = Bearer Token -> get the second element of authHeader after split by a space
    // if there is an authHeader -> get the token | else -> return undefined 
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    
    jwt.verify(token, process.env.SECRET_TOKEN, (err: Error, user: Object) => {
        // The callback is called with the decoded payload 
        // if the signature is valid and optional expiration, audience, or issuer are valid. 
        // If not, it will be called with the error.
        // So if token sent but not valid -> return a 'forbidden' status
        if(err) return res.sendStatus(403)
        req.body = user 
        next()
    })
}

export default router;