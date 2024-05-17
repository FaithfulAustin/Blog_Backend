import { NextFunction, Request, Response } from "express";
import UserService from "../../Services/UserService";
import HttpException from "../../error/HttpException";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";
import { categoryUserDto } from "../../dto/CategoryDto"
import { userDto } from "../../dto/UserDto";


export default class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUserProfile = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const email = request.userAuth
            const account = await this.userService.getUserProfile(email)
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "account authenticated", { User: account }))

        }
        catch (err: unknown) {
            next(err);
        }
    }

    public UpdateUserProfile = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const email = request.userAuth
            const update: userDto = request.body
            const account = await this.userService.updateUserProfile(email,update)
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "account authenticated", { User: account }))

        }
        catch (err: unknown) {
            next(err);
        }
    }

    public addCategoriesToUser = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const email = request.userAuth
            const update: categoryUserDto = request.body
            const data = await this.userService.addCategoriesToUser(update, email)
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "categories Added", data))

        }
        catch (err: unknown) {
            next(err);
        }
    }

  
    public viewAUserDetails = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const userId = request.params.id as string;
            const data = await this.userService.viewAUserDetails(userId)            
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "User: ", data))

        }    catch (err: unknown) {
            next(err);
        }
    }
  
    public getListOfUsers = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const data = await this.userService.getListOfUsers()          
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "List of Users", data))
      
        }    catch (err: unknown) {
            next(err);
        }
    }

    public followAUser = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {

        try {

            const Id = request.params.id as string;
            const email = request.userAuth

            const data = await this.userService.followAUser(Id,email)           
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "User: ", data))
 

        }    catch (err: unknown) {
            next(err);
        }
    }






}