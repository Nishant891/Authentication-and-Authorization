import {UserModel} from "../schemas/users.schema"
import { User } from "../types/user.types";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (UserData : User) => {
    return await UserModel.create(UserData);
} 

export const findUser = async (email : string) => {
    return await UserModel.findOne({email});
} 

export const updateRefreshToken = async (userId : string) => {
    await UserModel.findByIdAndUpdate(userId, {
        $set: { refreshToken: "" } 
    });
}

export const generateAccessToken = async (userData : User) => {
    const accessToken = jwt.sign({
        userData
    },
    process.env.ACTIVATION_SECRET,
    {
        expiresIn : 15 * 60 * 1000 
    })
    return accessToken;
}

export const generateRefreshToken = async (userId: Object) => {
    const refresToken = jwt.sign({
        userId
    },
    process.env.ACTIVATION_SECRET,
    {
        expiresIn : 3 * 24 * 60 * 60 * 1000 
    })
    return refresToken;
}
