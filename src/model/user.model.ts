import mongoose, { Document, Schema, model } from "mongoose";
// import User from "../interface/user.interface"

// import bcrypt from "bcrypt"
interface User {
    first_name: string;
    last_name: string;
    bio: string;
    email: string;
    profile_pic?: string;
    isNewStatus:boolean;
    isVerified:boolean;
    last_auth_type: "google" | "native";
    reseTokenExpiration:Date;
    googleId: String;
    joinedAt: Date;
    following: String[];
    followers: String[];
    category:string[];
    username?:string
    bookmarks: String[];
} 
const userSchema = new Schema<User>({
    first_name: {
        type: String,
        required: false,
    },
    username: String,
    last_name: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    profile_pic: {
        type: String,
        required: false
    },
    last_auth_type: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    joinedAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ]
})

const UserModel = model<User>("users", userSchema)
export default UserModel