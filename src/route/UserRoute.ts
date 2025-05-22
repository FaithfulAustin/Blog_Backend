import { Router } from "express";
import userController from "../controllers/User/userController";
import JWTValidator from "../middleware/JWTVaildator"


const UserController: userController = new userController()
const UserRouter = Router();

UserRouter.get('/userProfile', JWTValidator.isLoggedIn, UserController.getUserProfile)
UserRouter.post('/addCategoriesToUser', JWTValidator.isLoggedIn, UserController.addCategoriesToUser)
UserRouter.post('/followAUser/:id', JWTValidator.isLoggedIn, UserController.followAUser)
UserRouter.post('/unFollowAUser/:id',JWTValidator.isLoggedIn,UserController.unFollowAUser)
UserRouter.post('/UpdateUserProfile', JWTValidator.isLoggedIn, UserController.UpdateUserProfile)
UserRouter.get('/viewUser/:id', JWTValidator.isLoggedIn, UserController.viewAUserDetails)
UserRouter.get('/allUsers', JWTValidator.isLoggedIn, UserController.getListOfUsers)


export default UserRouter