import { Schema, model } from 'mongoose';
import User from "./../models/User"

interface Comment {
    createdAt: string
    username: string
    body: string
    upvotes: number
    downvotes: number
    user: typeof User
    replies: Array<Comment>
}

const schema = new Schema<Comment>({
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
        type: Schema.Types.ObjectId,
        ref: User
    },
    // if this does not work then ref itself -> ref: Comment 
    replies: [this]
    
  });

// create the model 
const CommentModel = model<Comment>('Comment', schema);

export default CommentModel;