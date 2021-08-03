import { Schema, model } from 'mongoose';
import Comment from "./../models/Comment"
import User from "./../models/User"

interface Post {
    createdAt: string
    username: string
    title: string
    body: string
    upvotes: number
    downvotes: number
    comments: Array<typeof Comment>
    user: Array<typeof User>
}

const schema = new Schema<Post>({
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
        type: Schema.Types.ObjectId,
        ref: Comment
    }], 
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    }
  });

// create the model 
const PostModel = model<Post>('Post', schema);

export default PostModel;