
import { NextFunction, Request, Response } from "express";
import PostService from "../../services/post.service";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";
// import { categoryDto } from "../../dto/"


export default class postController {

    private readonly postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    public getAllPostUserId = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const userId = request.params.id as string;

            const data = await this.postService.getAllPostUserId(userId)
            return response
                .status(StatusCodes.OK)
                .send(new HttpResponse("success", "Address retrieved", data));


        } catch (err: unknown) {
            next(err);
        }
    }

    public getPostById = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const postId = request.params.id as string;

            const data = await this.postService.getPostById(postId)
            return response
                .status(StatusCodes.OK)
                .send(new HttpResponse("success", "Address retrieved", data));


        } catch (err: unknown) {
            next(err);
        }
    }

    // public addCategory = async (
    //     request: Request,
    //     response: Response,
    //     next: NextFunction
    // ) => {
    //     try {
    //         const categoryName = request.body
    //         const data = await this.categoryService.addCategory(categoryName)
    //         return response
    //             .status(StatusCodes.OK)
    //             .send(new HttpResponse("success", "Category Added", data));


    //     } catch (err: unknown) {
    //         next(err);
    //     }
    // }

}