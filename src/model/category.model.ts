import mongoose, { Schema } from 'mongoose';
// import ICategory from '../interface/category.interface'

interface ICategory {
    categoryName: string;
    posts:string[];

}

const CategorySchema: Schema<ICategory> = new Schema({
    categoryName: { type: String, required: true },
});

const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
export default CategoryModel;
