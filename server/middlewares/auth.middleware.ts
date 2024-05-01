import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

interface DecodedJWT {
    userId: string;
    iat: number;
    exp: number;
}  
  
export interface customRequest extends Request{
     userId: string
}

dotenv.config();

export const verifyUser = async (req: customRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.body.refreshToken;
    
        if(!token){
            throw new Error("Unauthorized access");
        }
    
        const secret = process.env.ACTIVATION_SECRET || "";
        const decodedJWT = jwt.verify(token, secret) as DecodedJWT;
        if(!decodedJWT){
            throw new Error("Unable to verify JWT")
        }
        
        req.body.userId = decodedJWT.userId

        next()
        
    } catch (error) {
        throw new Error("Unauthorized access")
    }

}