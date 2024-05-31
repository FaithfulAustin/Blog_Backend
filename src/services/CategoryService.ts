import Category from "../model/Category";
import HttpException from "../error/HttpException"
import { StatusCodes } from "http-status-codes"
import { categoryDto } from "../dto/CategoryDto"

export default class CategoryService {

    private category = Category;

    public async getCategory() {
        const category = await this.category.find();
        return category;
    }

    public async addCategory(name: categoryDto) {
        const createdCategory = await this.category.create({ categoryName: name.categoryName });
        if (!createdCategory) {
            throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred")
        }
        return createdCategory;
    }


}