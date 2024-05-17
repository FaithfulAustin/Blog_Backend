
import { NextFunction, Request, Response } from "express";
import AuthService from "../../Services/Auth.services";
import { StatusCodes } from "http-status-codes";
import HttpResponse from "../../response/HttpResponse";
import { PasswordDto , emailDto } from "../../dto/SiginUpDto";
import Password from "../../Modal/Password";
import HttpException from "../../error/HttpException";


export default class AuthController {
    
    private readonly authServices: AuthService;

    constructor() {
        this.authServices = new AuthService();
    }

    public getPassword = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const emailDto = request.body as emailDto;

            const password = await this.authServices.getPassword(emailDto);


// Storing the Password to the DB
            const generatedPassword = await Password.create({ email:emailDto.email , password:password.password });
            if (!generatedPassword) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Otp error occurred");

            return response
                .status(201).json({
                    status: "success",
                    message: `Please check your email or sms  for your otp`,
                    otpIdForResendingOtp: generatedPassword._id
                  });
        } catch (err: unknown) {
            next(err);
        }
    };

    public passwordVerification = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const User = request.body as PasswordDto;

            const token = await this.authServices.passwordVerification(User);
            return response
                .status(StatusCodes.CREATED)
                .send(new HttpResponse("success", "Logged In", token));
        } catch (err: unknown) {
            next(err);
        }
    
    }

    public verifyAccount = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
           const token = request.headers.authorization
            if (!token) throw new HttpException(StatusCodes.BAD_REQUEST, "Authorization header needed")
            const splitToken = token?.split(' ')
            if (!splitToken[1]) throw new HttpException(StatusCodes.BAD_REQUEST, "input Token")
            const accessToken = await this.authServices.verify(splitToken[1])
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "account authenticated", { token: accessToken }))
        } catch (err: unknown) {
            next(err)
        }       
    };

}