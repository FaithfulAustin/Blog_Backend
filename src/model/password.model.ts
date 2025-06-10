import mongoose, { Schema } from 'mongoose';
// import IPassword from '../interface/password.interface';
interface IPassword {
    email: string;
    // user: Types.ObjectId;
    password: string;
    createdAt: Date

}


const PasswordSchema: Schema<IPassword> = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const PasswordModel = mongoose.model<IPassword>('Password', PasswordSchema);
export default PasswordModel;
