import mongoose, { Schema, Types } from 'mongoose';
// import password from '../Interface/password.interface';
import category from '../Interface/Category.interface'

const CategorySchema: Schema<category> = new Schema({
    name: { type: String, required: true},
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", 
        },
    ]
});

const category = mongoose.model<category>('Category', CategorySchema);
export default category;
