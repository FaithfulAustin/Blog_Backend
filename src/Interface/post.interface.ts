import { Types } from "mongoose";

export default interface IPost {
    title: string;
    content: string;
    publish: boolean;
    author: Types.ObjectId;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
    topic: Types.ObjectId;
  }
  