import { Router } from "express";
import userController from "../Controllers/User/userController";
import JWTVaildator from "../middleware/JWTVaildator"


const UserController: userController = new userController()
const UserRouter = Router();

UserRouter.get('/userProfile',JWTVaildator.isLoggedIn,UserController.getUserProfile)
UserRouter.post('/addCategoriesToUser',JWTVaildator.isLoggedIn,UserController.addCategoriesToUser)
UserRouter.post('/followAUser/:id',JWTVaildator.isLoggedIn,UserController.followAUser)
UserRouter.post('/UpdateUserProfile',JWTVaildator.isLoggedIn,UserController.UpdateUserProfile)
UserRouter.get('/viewUser/:id',JWTVaildator.isLoggedIn,UserController.viewAUserDetails)
UserRouter.get('/allUsers',JWTVaildator.isLoggedIn,UserController.getListOfUsers)


export default  UserRouter