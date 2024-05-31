import { Types } from "mongoose";

export default interface ILike {
    user: Types.ObjectId;
    post: Types.ObjectId;
}