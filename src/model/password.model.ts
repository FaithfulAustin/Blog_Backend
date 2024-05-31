import mongoose, { Schema } from 'mongoose';
import IPassword from '../interface/password.interface';

const PasswordSchema: Schema<IPassword> = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const PasswordModel = mongoose.model<IPassword>('Password', PasswordSchema);
export default PasswordModel;
