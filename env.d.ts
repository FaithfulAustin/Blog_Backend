import { Multer } from 'multer';
import { Document, Types } from "mongoose"
import User from "./src/interface/user.interface";

interface IUser extends User {

}

declare global {
    namespace Express {
        interface Request {
            userAuth: string;
            File: Multer.File; // Extend Request interface to include 'file' property
            _user: Document<unknown, {}, IUser> & IUser & {
                _id: Types.ObjectId;
            }; // Change the type to User and make it optional
        }
    }
}
