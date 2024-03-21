"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RegisterFormSchema } from "@/schemas/schemas";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import { FormSucess } from "./form-sucess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { createOTP } from "../functions/createOTP";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from 'recoil';
import { activationCodeState, userState } from '../states/states';

export const RegisterForm = () => {
  const router = useRouter();
  const [isPending] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const setActivationCode = useSetRecoilState(activationCodeState);
  const setUser = useSetRecoilState(userState);
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof RegisterFormSchema>) => {
    const result = await createOTP(values, setUser, setActivationCode);
    if (result.success) {
      setSuccessMessage(result.message);
      router.push("/auth/verification");
    } else {
      setErrorMessage(result.message);
    }
  };
  return (
    <CardWrapper
      titlelabel="Register"
      headerlabel="Let's get you onboard"
      footerlabel="Already registerd?"
      footerhref="login"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="w-full sm:w-[22rem]"
                    placeholder="Pick a username.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="w-full sm:w-[22rem]"
                    placeholder="Your email.."
                    {...field}
                  />
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
                  <Input
                    disabled={isPending}
                    className="w-full sm:w-[22rem]"
                    placeholder="Select a password.."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            className="w-full font-bold py-1"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <FormError message={errorMessage} />
        <FormSucess message={successMessage} />
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
