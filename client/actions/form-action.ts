"use server";
import * as z from "zod"
import { RegisterFormSchema, LoginFormSchema } from '@/schemas/schemas';

export const login = ( values : z.infer<typeof LoginFormSchema>) => {
    
}

export const register = ( values : z.infer<typeof RegisterFormSchema>) => {

}