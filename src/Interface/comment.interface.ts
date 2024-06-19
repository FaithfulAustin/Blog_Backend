import { Types } from "mongoose";

export default interface IComment {
    content: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
}