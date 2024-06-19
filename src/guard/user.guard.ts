import BaseAuth from "./base.guard";
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import User from "../interface/user.interface";
import UserModel from "../model/user.model";
import HttpException from "../error/HttpException";

class UserGuard extends BaseAuth {
    private model: Model<User>
    constructor(req: Request, res: Response) {
        super(req, res)
        this.model = UserModel
    }
    static async createInstance(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await new UserGuard(req, res).isExist();

            req["_user"] = user;
            return next()
        } catch (e) {
            next(e);
        }
    }
    async isExist() {
        const user = await this.model.findOne({ email: this.value })
        if (!user) throw new HttpException(404, "account not found")
        return user
    }
}

export default UserGuard;