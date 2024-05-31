import { Types } from "mongoose";

export default interface IPost {
    title: string;
    content: string;
    author: Types.ObjectId;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    topic: Types.ObjectId;
  }
  