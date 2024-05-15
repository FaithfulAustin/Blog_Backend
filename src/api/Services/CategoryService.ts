import Category from "../Modal/Category";
import HttpException from "../error/HttpException"
import { StatusCodes } from "http-status-codes"

export default class CategoryService{

    private category = Category;

    public async getCategory(){
        const category = await this.category.find();
        return category;
    }
    

  

}