import { Request, Response, Router } from "express";
import CategoryController from "../Controllers/Category/categoryController";
import JWTVaildator from "../middleware/JWTVaildator";

const categoryController:CategoryController = new CategoryController();
const categoryRoute = Router();
categoryRoute.get('/getCategories',JWTVaildator.isLoggedIn,categoryController.getCategories)
categoryRoute.post('/addCategory',JWTVaildator.isLoggedIn,categoryController.addCategory)


// categoryRoute.get('/category', categoryController.getCategories)  


export default categoryRoute;