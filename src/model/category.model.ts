import mongoose, { Schema } from 'mongoose';
import ICategory from '../interface/category.interface'

const CategorySchema: Schema<ICategory> = new Schema({
    categoryName: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
export default CategoryModel;
