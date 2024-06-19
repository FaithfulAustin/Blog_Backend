import mongoose, { Schema, Document } from 'mongoose';
import ILike from '../interface/like.interface';


const LikeSchema: Schema = new Schema<ILike>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });

const Like = mongoose.model<ILike>('Like', LikeSchema);

export default Like;
