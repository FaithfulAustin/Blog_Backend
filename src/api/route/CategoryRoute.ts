import { Request, Response, Router } from "express";
import CategoryController from "../Controllers/Category/categoryController";

const categoryController:CategoryController = new CategoryController();
const categoryRoute = Router();
categoryRoute.post('/getCategories',categoryController.getCategories)


// categoryRoute.get('/category', categoryController.getCategories)  


export default categoryRoute;