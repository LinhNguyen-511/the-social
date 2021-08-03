import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface User {
    username: string
    email: string
    password: string
    profilePicture?: string
    followers: Array<User>
    following: Array<User>
    reputation: number
    isAdmin: boolean
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
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
const UserModel = model<User>('User', schema);

export default UserModel;