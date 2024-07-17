// models/User.ts
import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username : { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
