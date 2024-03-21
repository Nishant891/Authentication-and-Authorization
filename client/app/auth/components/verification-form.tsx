"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { VerificationFormSchema } from "@/schemas/schemas";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "./form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activationCodeState } from '../states/states';
import { createUser } from "../functions/createUser";
import { userState } from "../states/states";
import { useRouter } from "next/navigation";

const VerificationForm = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [errorMessage, setErrorMessage] = useState("");
  const activationCode = useRecoilValue(activationCodeState);
  const [isPending] = useTransition();
  const form = useForm<z.infer<typeof VerificationFormSchema>>({
    resolver: zodResolver(VerificationFormSchema),
    defaultValues: {
      code: ""
    },
  });
  const onSubmit = async (values: z.infer<typeof VerificationFormSchema>) => {
    if(values.code == activationCode){
        const result = await createUser(user);
        if(result.success){
          router.push("/");
        }else{
          setErrorMessage(result.message);
        }
    }else{
        setErrorMessage("Incorrect OTP");
    }
  };
  return (
    <CardWrapper
      titlelabel="OTP Verification"
      headerlabel="Enter your OTP!"
      footerlabel="Didn't get your OTP?"
      footerhref="signup"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isPending}
                    className="w-full sm:w-[22rem]"
                    placeholder="OTP..."
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
            Verify
          </Button>
        </form>
        <FormError message={errorMessage} />
      </Form>
    </CardWrapper>
  );
};

export default VerificationForm;
