"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
var schema = new mongoose_1.Schema({
    // unique username 
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 12,
        max: 16
    },
    profilePicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    reputation: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        defaut: false
    }
});
// 3. Create a Model.
var UserModel = mongoose_1.model('User', schema);
exports.default = UserModel;
