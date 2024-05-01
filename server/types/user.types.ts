export interface User {
    username?: string;
    email: string;
    password: string;
}

interface UserData {
    _id: string;
    username: string;
    email: string;
    password: string;
    __v: number;
    refreshToken: string;
  }
  
export interface ResponseData {
    userData: UserData;
    iat: number;
    exp: number;
}