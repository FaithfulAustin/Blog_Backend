import { Request, Response, Router } from "express";
import JWTValidator from "../middleware/JWTVaildator";
import PostController from "../controllers/Post/postController";

const postController: PostController = new PostController();
const postRoute = Router();
postRoute.get('/getAllPostUserId/:id', JWTValidator.isLoggedIn, postController.getAllPostUserId)
postRoute.get('/getPostById/:id', JWTValidator.isLoggedIn, postController.getPostById)
postRoute.post('/addCategoriesToPost/:id', JWTValidator.isLoggedIn, postController. addCategoriesToPost)
postRoute.post('/publishPost/:id', JWTValidator.isLoggedIn, postController.publishPost)
// postRoute.post('/addpost', JWTValidator.isLoggedIn, postController.addCategory)d




export default postRoute;