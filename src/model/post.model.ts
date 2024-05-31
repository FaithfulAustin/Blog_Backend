import mongoose, { Schema, Document } from 'mongoose';
import IPost from '../interface/post.interface';


const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
}, { timestamps: true });

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
