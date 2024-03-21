import {UserModel} from "../schemas/users.schema"
import { User } from "../types/user.types";

export const createUser = async (UserData : User) => {
    return await UserModel.create(UserData);
} 

export const findUser = async (email : string) => {
    return await UserModel.findOne({email});
} 
