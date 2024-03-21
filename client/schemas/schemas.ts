"use client";

import * as z from "zod";

export const VerificationFormSchema = z.object({
  code: z.string().max(4, {message: "OTP is 4 digit number"}),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

export const RegisterFormSchema = z.object({
  username: z.string().min(2, { message: "Username must be atleast 2 characters" }).max(50, { message: "Username cannot be more than 50 characters" }), 
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});
