import mongoose from "mongoose"
import express from "express"
import axios from 'axios'

import Channel from "./../models/Channel"

const router = express.Router()

router.get('/list', async (req: express.Request, res: express.Response): Promise<void> => {
    axios.get('https://api.coingecko.com/api/v3/coins/list')
    .then(Response => {
        const data = Response.data
        console.log(data.length)
        // data.forEach((coin: any) => {
        //     const channel = new Channel({
        //         name: coin.name,
        //         id: coin.id,
        //         symbol: coin.symbol
        //     }).save()            
        // });
    })
    .catch(e => console.log(e))
})

export default router