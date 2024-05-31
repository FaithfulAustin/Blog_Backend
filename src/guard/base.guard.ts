import { NextFunction, Request, Response } from 'express';
import HttpException from '../error/HttpException';
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from '../config';


class BaseGuard {
    protected token: string;
    protected value: string;
    constructor(req: Request | any, res: Response) {
        this.token = req.headers.authorization?.split(' ')[1] as string
        const jwtToken = jwt.verify(this.token, ACCESS_TOKEN as string) as { value: string }
        this.value = jwtToken.value as unknown as string;
    }
    static async check(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            if (token) {
                return next();
            }
            throw new HttpException(401, "token required")
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
}
export default BaseGuard