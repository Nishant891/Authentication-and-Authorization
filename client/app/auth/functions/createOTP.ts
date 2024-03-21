import axios from 'axios';
import { sendEmail } from './sendEmail';

interface Activation{
    token: string;
}

export interface Return {
    success: boolean;
    message: string;
    payload?: Activation;
}

export interface User {
    username: string;
    email: string;
    password: string;
}

export const createOTP = async (user : User, setUser : Function, setActivationCode : Function) => {
    
    try {
        const response = await axios.post("http://localhost:8000/verification", {
            ...user
        });

        const result: Return = response.data;

        if(!result.success){
            return {
                success: result.success,
                message: result.message,
            }
        }
        if(result.payload){
            const token = result.payload.token;

            const [header, payload, signature] = token.split('.');

            const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');

            const payloadData = JSON.parse(decodedPayload);

            setUser(payloadData.user);

            setActivationCode(payloadData.activationCode);

            return await sendEmail(payloadData.user.email, payloadData.activationCode);
        }else{
            return{
                success: false,
                message: "Failed to create code"
            }
        }

    } catch (error) {
        return{
            success: false,
            message: "OTP cannot be sent"
        }
    }
}