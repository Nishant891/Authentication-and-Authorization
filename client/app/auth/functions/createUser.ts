import axios from 'axios';

export interface User {
    username: string;
    email: string;
    password: string;
}

export interface Return {
    success: boolean;
    accessToken: string,
    refreshToken: string,
    message: string;
}

export const createUser = async (user : User,) => {
    
    try {
        const response = await axios.post("http://localhost:8000/signup", {
            ...user
        });

        const result: Return = response.data;

        return {
            success: result.success,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            message: result.message,
        }
    } catch (error) {
        return{
            success: false,
            message: "User cannot be created"
        }
    }
}