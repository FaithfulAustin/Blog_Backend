import mongoose, { Schema, Types } from 'mongoose';
import password from '../Interface/password.interface';

const PasswordSchema: Schema<password> = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },    
});

const PasswordModel = mongoose.model<password>('Password', PasswordSchema);
export default PasswordModel;
