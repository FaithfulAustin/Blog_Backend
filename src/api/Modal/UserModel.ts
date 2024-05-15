import mongoose, { CallbackWithoutResultAndOptionalError, Schema, model } from "mongoose";
import User from "../Interface/user.Interface";


// import bcrypt from "bcrypt"

const userSchema = new Schema<User>({
    first_name: {
        type: String,
        required: false,
    },
    last_name: {
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
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
})

const UserModel = model<User>("users", userSchema)
export default UserModel