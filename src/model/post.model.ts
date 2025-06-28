import mongoose, { Schema } from 'mongoose';
import IPost from '../interface/post.interface';


const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, default: "" },
  content: { type: String, default: "" },
  publish: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  topic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: [] }],
}, { timestamps: true });

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
