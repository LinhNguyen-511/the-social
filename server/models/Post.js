"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Comment_1 = __importDefault(require("./../models/Comment"));
var User_1 = __importDefault(require("./../models/User"));
var schema = new mongoose_1.Schema({
    createdAt: String,
    username: String,
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    comments: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: Comment_1.default
        }],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: User_1.default
    }
});
// create the model 
var PostModel = mongoose_1.model('Post', schema);
exports.default = PostModel;
