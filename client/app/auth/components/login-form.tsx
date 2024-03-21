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

export const LoginForm = () => {
  const [isPending] = useTransition();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const onSubmit = (values : z.infer<typeof LoginFormSchema>) => {
    
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
      <FormError message=""/>
      <FormSucess message=""/>
    </Form>
    </CardWrapper>
  )
}

export default LoginForm
