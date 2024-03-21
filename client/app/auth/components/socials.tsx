"use client";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Socials = () => {
  const { toast } = useToast();
  return (
    <>
      <Separator className="mb-5" />
      <div className="w-full flex justify-evenly items-center">
        <Button variant={"outline"} className="w-5/12" onClick={() => {
          toast({
            duration: 2000,
            variant: "info",
            title: "Comming soon",
            description: "Feature will be integrated soon",
          })
        }}>
          <FcGoogle size={24} />
        </Button>
        <Button className="w-5/12" onClick={() => {
          toast({
            duration: 2000,
            variant: "info",
            title: "Comming soon",
            description: "Feature will be integrated soon",
          })
        }}>
          <FaGithub size={24} />
        </Button>
      </div>
    </>
  );
};

export default Socials;
