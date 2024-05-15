import { Types } from "mongoose";

export default interface Password {
    email: string;
    // user: Types.ObjectId;
    password: string;
    createdAt: Date

}
