import mongoose, { Schema, model, Document } from 'mongoose';
import IComment from '../interface/comment.interface';



const CommentSchema: Schema = new Schema<IComment>({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

const CommentModel = model<IComment>("comment", CommentSchema)

export default CommentModel;
