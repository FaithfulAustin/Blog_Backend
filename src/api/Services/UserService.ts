import { StatusCodes } from "http-status-codes";
import User from "../Interface/user.Interface";
import UserModel from "../Modal/UserModel";
import HttpException from "../error/HttpException";
import Jwt from "../Utills/jwt";
import { categoryUserDto } from "../dto/CategoryDto"
import Category from "../Modal/Category";
import { userDto } from "../dto/UserDto";


export default class UserService {

    private user = UserModel
    private Category = Category

    //    public async getUserProfile(email:string){
    //         const user = await this.user.findById(userId);
    //         return user;
    //     }

    public async getUserProfile(email: string ) {

        const account = await this.findByEmail(email);
        return account;
    }

    public async updateUserProfile(email: string , update:userDto) {

        const account = await this.findByEmail(email);
        const data = await this.user.findByIdAndUpdate(account.id,update, { new: true })
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

        const data = await this.user.findByIdAndUpdate(userId, { category: Categories.categoriesId }, { new: true })
        if (!data) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred");


        // account.category = Categories
        // const account = await this.user.findOne({ email })
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

    public async followAUser(id: string,email: string) {
        const user = await this.user.findOne({email});
        const followedaccount = await this.user.findById(id);

        if (!followedaccount) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
        if(followedaccount.id === user?.id ) throw new HttpException(StatusCodes.FORBIDDEN, "Can't follow yourself");

        //Update and Insert the new follower
        this.updatefollowers(user?.id,id)

        //Update and Insert the new followed account
        const data = await this.user.findByIdAndUpdate(user?.id,{following:id}, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error updating following");

      
        return data;
    }
    public async updatefollowers(followersId: string, id: string) {

        // Get the Followers Data 
        const follower = await this.user.findById(followersId);
        if (!follower) throw new HttpException(StatusCodes.NOT_FOUND, "fOLLOWER not found");

        //Update your followers list
        const data = await this.user.findByIdAndUpdate(id,{followers:followersId}, { new: true })
        if (!data) throw new HttpException(StatusCodes.NOT_FOUND, "error updating followers");

        return data;

    }


  public async findByEmail(email: string) {
    const account = await this.user.findOne({ email })
    if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
    return account;
  }



















}