import { Schema, model, connect } from 'mongoose';
import axios from 'axios'
import Post from "./../models/Post"
import User from "./../models/User"

interface Channel {
    coin_id?: number
    name: string
    symbol?: string 
    welcomeMessage: string 
    posts?: Array<typeof Post>
    followers?: Array<typeof User>
} 

const schema = new Schema<Channel>({
    coin_id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },  
    symbol: {
        type: String 
    }, 
    welcomeMessage: {
        type: String, 
        default: 'Welcome to this channel!'
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: Post
    }], 
    followers: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
});

// create the model 
const ChannelModel = model<Channel>('Channel', schema);


// run().catch(err => console.log(err));
// async function run(): Promise<void> {
//     await connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//     });
//     console.log('running Channel model')
//     axios.get('https://api.coingecko.com/api/v3/coins/list')
//     .then(Response => {
//         const data = Response.data
//         data.forEach(coin => {
//             const channel = new ChannelModel({
//                 name: coin.name,
//                 id: coin.id,
//                 symbol: coin.symbol
//             }).save()            
//         });
//     })
//     .catch(e => console.log(e))
// }

export default ChannelModel;