
import { NextFunction, Request, Response } from "express";
import PostService from "../../services/post.service";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";
import { categoryArrayDto } from "../../dto/CategoryDto";
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
                .send(new HttpResponse("success", "Post retrieved", data));


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
                .send(new HttpResponse("success", "Post retrieved", data));


        } catch (err: unknown) {
            next(err);
        }
    }
    public addCategoriesToPost = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const postId = request.params.id as string;
            const update: categoryArrayDto = request.body
            const data = await this.postService.addCategoriesToPost(postId,update)
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "categories Added", data))

        }
        catch (err: unknown) {
            next(err);
        }
    }



}