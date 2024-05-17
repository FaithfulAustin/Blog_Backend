import { NextFunction, Request, Response } from "express";
import HttpException from "../error/HttpException";
import { StatusCodes } from "http-status-codes";
import Jwt from "../Utills/jwt";

export default class JWTVaildator  {

    // public token = 

    public static isLoggedIn = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            //Obtain Token from headers
            const token = request.headers.authorization
            // console.log(token);
            if (!token) throw new HttpException(StatusCodes.BAD_REQUEST, "Authorization header needed")
                const splitToken = token?.split(' ')
            if (!splitToken[1]) throw new HttpException(StatusCodes.BAD_REQUEST, "input Token")
            
            const decodedUser =  Jwt.verifyJwt(splitToken[1])
            if (!decodedUser) {throw new HttpException(StatusCodes.BAD_REQUEST, "input Token")}
            else{
                request.userAuth = decodedUser?.value;
            }

                

            next();                
        }  catch(err: unknown){
            next(err);
        }
    }

}