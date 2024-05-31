import { Router } from "express";
import AuthController from "../Controllers/auth/authController";
import dtoValidationMiddleware from "../middleware/dto.validator.middleware";
import { EmailDto } from "../dto/SiginUpDto";

const authController: AuthController = new AuthController();
const authRouter = Router();

authRouter.post('/getPassword', dtoValidationMiddleware(EmailDto, "body", "missing parameters"), authController.getPassword)
authRouter.post('/verifyPassword', authController.passwordVerification)
authRouter.post('/verifyAccount', authController.verifyAccount)

export default authRouter;
