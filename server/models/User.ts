import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
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

// create the model 
const User = mongoose.model('User', userSchema)

export default User;