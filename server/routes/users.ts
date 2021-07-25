import express from 'express';

const router = express.Router()

router.get('/', (req: express.Request, res: express.Response): any => {
    res.send("User route")
})

export default router;