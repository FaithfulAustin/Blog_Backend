import mongoose, { Schema, model, Document, Types } from 'mongoose';
// import IComment from '../interface/comment.interface';

interface IComment {
    content: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
}

const CommentSchema: Schema = new Schema<IComment>({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

const CommentModel = model<IComment>("comment", CommentSchema)

export default CommentModel;
