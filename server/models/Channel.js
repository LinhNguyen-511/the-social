"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Post_1 = __importDefault(require("./../models/Post"));
var User_1 = __importDefault(require("./../models/User"));
var schema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Post_1.default
        }],
    followers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: User_1.default
        }]
});
// create the model 
var ChannelModel = mongoose_1.model('Channel', schema);
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
exports.default = ChannelModel;
