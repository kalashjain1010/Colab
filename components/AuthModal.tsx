"use client";

import Container from "./Container";
import Image from "next/image";

import {
  useForm,
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import React, { useContext } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { userContext } from "@/app/hooks/useUser";

interface AuthModalProps {
  isLoading: boolean
  heading: string;
  onSubmit: (values: FieldValues) => void;
  children: React.ReactNode;
  imageSrc: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  children,
  imageSrc,
  onSubmit,
  handleSubmit,
  heading,
  isLoading
}) => {
  const router = useRouter()
  const context = useContext(userContext)
  if(context?.user){
    router.push(`Projects`)
  }
  return (
    <Container>
      <div className="fixed h-screen w-screen bg-blue-400 opacity-60 rounded-full -translate-x-[50%] z-[-1]"></div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center">
          <div className="h-[590px] w-[388px] relative">
            <Image src={imageSrc} className="absolute" fill alt="frame" />
          </div>
        </div>
        <div className="h-full w-full p-10 flex items-start justify-center flex-col gap-y-2 xl:px-40">
          <h2 className="w-full text-center text-3xl font-semibold mb-4">
            {heading}
          </h2>
          <form action="" onSubmit={handleSubmit(onSubmit)} className="w-full">
            {children}
            <Button
              type="submit"
              className="bg-blue-700 text-white w-full p-2 mt-3"
              disabled={isLoading}
            >
              {heading}
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default AuthModal;
