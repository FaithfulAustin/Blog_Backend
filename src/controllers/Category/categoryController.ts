
import { NextFunction, Request, Response } from "express";
import CategoryService from "../../services/category.service";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";
import { categoryDto } from "../../dto/CategoryDto"


export default class categoryController {

    private readonly categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public getCategories = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const data = await this.categoryService.getCategory()
            return response
                .status(StatusCodes.OK)
                .send(new HttpResponse("success", "Address retrieved", data));


        } catch (err: unknown) {
            next(err);
        }
    }

    public addCategory = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const categoryName: categoryDto = request.body
            const data = await this.categoryService.addCategory(categoryName)
            return response
                .status(StatusCodes.OK)
                .send(new HttpResponse("success", "Category Added", data));


        } catch (err: unknown) {
            next(err);
        }
    }

}