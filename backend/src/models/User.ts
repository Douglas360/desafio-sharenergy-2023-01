import mongoose from 'mongoose';
import { UserType } from '../types/UserType';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});


const User = mongoose.model<UserType>('User', userSchema);


export { User }