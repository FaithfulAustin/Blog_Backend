
import { NextFunction, Request, Response } from "express";
import CategoryService from "../../Services/CategoryService";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";


export default class categoryController{
    
    private readonly categoryService:CategoryService;

    constructor(){
        this.categoryService = new CategoryService();
    }

    public getCategories = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const user = request
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
            const user = request
            const data = await this.categoryService.getCategory()
            return response 
                .status(StatusCodes.OK)
                .send(new HttpResponse("success", "Address retrieved", data));
        

        } catch (err: unknown) {
            next(err);
        }
    }

}