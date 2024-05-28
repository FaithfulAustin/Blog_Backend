import { Request, Response, Router } from "express";
import CategoryController from "../Controllers/Category/categoryController";
import JWTValidator from "../middleware/JWTVaildator";

const categoryController: CategoryController = new CategoryController();
const categoryRoute = Router();
categoryRoute.get('/getCategories', JWTValidator.isLoggedIn, categoryController.getCategories)
categoryRoute.post('/addCategory', JWTValidator.isLoggedIn, categoryController.addCategory)


// categoryRoute.get('/category', categoryController.getCategories)  


export default categoryRoute;