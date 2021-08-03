"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var User_1 = __importDefault(require("./../models/User"));
var schema = new mongoose_1.Schema({
    createdAt: String,
    username: String,
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
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: User_1.default
    },
    // if this does not work then ref itself -> ref: Comment 
    replies: [this]
});
// create the model 
var CommentModel = mongoose_1.model('Comment', schema);
exports.default = CommentModel;
