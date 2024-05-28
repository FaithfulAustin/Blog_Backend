import { StatusCodes } from "http-status-codes";
import User from "../Interface/user.Interface";
import UserModel from "../Modal/UserModel";
import HttpException from "../error/HttpException";
import Jwt from "../Utils/jwt";
import { categoryUserDto } from "../dto/CategoryDto"
import Category from "../Modal/Category";
import { userDto } from "../dto/UserDto";
import category from "../Modal/Category";


export default class UserService {

    private user = UserModel
    private Category = category

    //    public async getUserProfile(email:string){
    //         const user = await this.user.findById(userId);
    //         return user;
    //     }

    public async getUserProfile(email: string) {

        const account = await this.findByEmail(email);
        return account;
    }

    public async updateUserProfile(email: string, update: userDto) {

        const account = await this.findByEmail(email);
        const data = await this.user.findByIdAndUpdate(account.id, update, { new: true })
        if (!data) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred when updating the account");

        return data;
    }

    public async addCategoriesToUser(Categories: categoryUserDto, email: string) {

        const vaildCategories = await this.Category.find({
            _id: { $in: Categories.categoriesId }
        })
        console.log(vaildCategories);

        if (vaildCategories.length !== Categories.categoriesId.length) {
            throw new HttpException(StatusCodes.NOT_FOUND, "One of the Ids of the Categories does not exist");
        }

        const account = await this.findByEmail(email);
        const userId = account.id;


        const data = await this.user.findByIdAndUpdate(userId, { $addToSet: { category: Categories.categoriesId } }, { new: true })
        if (!data) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred");

        return data;
    }
    public async viewAUserDetails(id: string) {
        const account = await this.user.findById(id);
        if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
        // const account = await this.user.findOne({ email })
        return account;
    }

    public async getListOfUsers() {

        const account = await this.user.find();
        if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "accounts not found");
        // const account = await this.user.findOne({ email })
        return account;
    }

    public async followAUser(id: string, email: string) {
        const User = await this.user.findOne({ email });
        const followedaccount = await this.user.findById(id);

        if (!followedaccount) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
        if (followedaccount.id === User?.id) throw new HttpException(StatusCodes.FORBIDDEN, "Can't follow yourself");

        //Update and Insert the new follower
        this.updatefollowers(User?.id, id)


        //Add the new follower to the array of following
        // User?.following.push(id)

        //Update and Insert the new followed account
        const data = await this.user.findByIdAndUpdate(User?.id, { $addToSet: { following: id } }, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error updating following");


        return data;
    }

    public async unfollowAUser(id: string, email: string) {

        const User = await this.user.findOne({ email });
        const followedaccount = await this.user.findById(id);

        if (!User) throw new HttpException(StatusCodes.NOT_FOUND, "user not found");
        if (!followedaccount) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
        if (followedaccount.id === User?.id) throw new HttpException(StatusCodes.FORBIDDEN, "Can't Unfollow yourself");

        // Update and remove the follower 
        this.removeAFollower(User.id, followedaccount.id);

        // Get the index of the following in the following array
        const index = User.following.indexOf(id);
        if (index === -1) throw new HttpException(StatusCodes.NOT_FOUND, "YOU ARE NOT Following ");

        // Remove the following from the following array
        User?.following.splice(index, 1);


        //Update and Insert the new followed account
        const data = await this.user.findByIdAndUpdate(User?.id, { following: User?.following }, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error updating following");


        return data;
    }
    public async removeAFollower(followersId: string, id: string) {

        //User that is abt to be unfollowed
        const User = await this.user.findById(id);
        if (!User) throw new HttpException(StatusCodes.NOT_FOUND, "account to be updated not found");


        // Get the index of the follower in the follower array 
        const index = User.followers.indexOf(followersId);
        if (index === -1) throw new HttpException(StatusCodes.NOT_FOUND, "YOU ARE NOT Following ");

        // Remove the follower from the follower array
        User.followers.splice(index, 1);

        //Update your followers list
        const data = await this.user.findByIdAndUpdate(id, { followers: User.followers }, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error Removing followers");

        return data;

    }
    public async updatefollowers(followersId: string, id: string) {

        //Update your followers list
        const data = await this.user.findByIdAndUpdate(id, { $addToSet: { followers: followersId } }, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error updating followers");

        return data;

    }

    public async findByEmail(email: string) {
        const account = await this.user.findOne({ email })
        if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
        return account;
    }



















}