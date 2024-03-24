import {UserModel} from "../schemas/users.schema"
import { User } from "../types/user.types";
import jwt from "jsonwebtoken";

export const createUser = async (UserData : User) => {
    return await UserModel.create(UserData);
} 

export const findUser = async (email : string) => {
    return await UserModel.findOne({email});
} 

export const updateToken = async (userId : Object, token : string) => {
    return await UserModel.updateOne(
        {_id : userId},
        {
            $set : {
                "refreshToken" : token
            }
        }
    );
}

export const generateAccessToken = async (userData : User) => {
    const accessToken = jwt.sign({
        userData
    },
    process.env.ACTIVATION_SECRET,
    {
        expiresIn : 3 * 24 * 60 * 60 * 1000 
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
