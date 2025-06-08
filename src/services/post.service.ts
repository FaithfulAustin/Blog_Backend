import { StatusCodes } from "http-status-codes";
import HttpException from "../error/HttpException";
import PostModel from "../model/post.model";
import UserModel from "../model/user.model";

export default class PostService {
    private postModel = PostModel
    private userModel = UserModel

    public async createPost(postId: string, email: string, content: string) {
        const foundUser = await this.userModel.findOne({ email })
        if (!foundUser) throw new HttpException(StatusCodes.NOT_FOUND, "User not found")
        if (postId.toLowerCase() === "new") {
            const newPost = await this.postModel.create({
                author: foundUser._id,
                content
            })
            if (newPost) {
                return {isSaved:true, postId:newPost._id}
            } else {
                throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Unable to create post")
            }
        }
        const foundPost = await this.postModel.findById(postId)
        if (!foundPost) throw new HttpException(StatusCodes.NOT_FOUND, "Post not found")
        if (foundUser?._id !== foundUser._id) throw new HttpException(StatusCodes.UNAUTHORIZED, "User can't edit this post")
        foundPost.content = content
        const savedPost = await foundPost.save();
        if (!savedPost) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Unable to create post")

         return {isSaved:true, postId:savedPost._id}
    }

    public async getAllPostUserId(id: string) {
        const userId = await this.userModel.findById(id);
        if (!userId) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");

        const post = await this.postModel.find({author:userId})
        if (!post) throw new HttpException(StatusCodes.NOT_FOUND, "Posts not found");

        return post;
    }

    public async getPostById(id: string) {
        const post = await this.postModel.findById(id);
        if (!post) throw new HttpException(StatusCodes.NOT_FOUND, "post not found");
        return post;
    }

}