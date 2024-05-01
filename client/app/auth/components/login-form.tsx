"use client";
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { LoginFormSchema } from '@/schemas/schemas';
import { CardWrapper } from './card-wrapper';
import { FormError } from './form-error';
import { FormSucess } from './form-sucess';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from 'react';
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useCookies } from "react-cookie"

export interface User {
  username?: string;
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [accessTokenCookie, setAccessTokenCookie] = useCookies(["accessTokenCookie"])
  const [refreshTokenCookie, setRefreshTokenCookie] = useCookies(["refreshTokenCookie"])
  const router = useRouter();
  const [isPending] = useTransition();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (values : User) => {
    const response : AxiosResponse = await axios.post("http://localhost:8000/login", {
        ...values
    });
    if(response.data){
      if (response.data.success) {
        setAccessTokenCookie("accessTokenCookie", response.data.accessToken, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: "strict"
        });
        setRefreshTokenCookie("refreshTokenCookie", response.data.refreshToken, {
          path: "/",
          maxAge: 7200, // Expires after 2hr
          sameSite: "strict"
        });
        setSuccessMessage(response.data.message);    
        router.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    }
  }
  const onSubmit = (values : z.infer<typeof LoginFormSchema>) => {
    handleSubmit(values);
  }
  return (
    <CardWrapper 
    titlelabel = "LOGIN"
    headerlabel="Welcome back!"
    footerlabel = "Don't have an account?"
    footerhref='signup'
    showSocial={true}
    >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input disabled={isPending} className='w-full sm:w-[22rem]' placeholder="Your email.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input disabled={isPending} className='w-full sm:w-[22rem]' placeholder="Your password.." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className='w-full font-bold py-1' type="submit">Submit</Button>
      </form>
      <FormError message={errorMessage}/>
      <FormSucess message={successMessage}/>
    </Form>
    </CardWrapper>
  )
}

export default LoginForm
