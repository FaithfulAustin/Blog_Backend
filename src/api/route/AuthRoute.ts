import { IRoute, Router } from "express";
import AuthController from "../Controllers/auth/authController";
import { IRouterHandler } from "express-serve-static-core";
import { json } from "stream/consumers";

const authController: AuthController = new AuthController();
const authRouter = Router();

authRouter.post('/getPassword', authController.getPassword)
authRouter.post('/verifyPassword', authController.passwordVerification)
authRouter.post('/verifyAccount', authController.verifyAccount)

export default authRouter;
