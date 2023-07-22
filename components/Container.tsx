"use client";

import React, { useContext } from "react";
import Image from "next/image";
import NavItems from "./NavItems";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { userContext } from "@/app/hooks/useUser";
import { auth } from "@/utils/firebase";
import { Toaster } from "react-hot-toast";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  // const user = auth.currentUser
  const router = useRouter();
  const context = useContext(userContext);

  const Logout = async () => {
    await auth.signOut();
    router.refresh();
    router.push("/");
  };
  return (
    <>
      <Toaster />
      <div
        className={twMerge(
          "flex flex-col md:flex-row items-center justify-between h-min-[136px] min-w-full py-6 px-10 bg-blue-100 gap-y-3",
          className
        )}
      >
        <div className="flex-1 flex items-center gap-x-5 flex-col md:flex-row gap-y-3">
          <div className="" onClick={() => router.push("/")}>
            <Image
              src="/images/Logo.svg"
              className="cursor-pointer"
              width={180}
              height={180}
              alt="logo"
            />
          </div>
          <div className="flex flex-row">
            <NavItems
              label="Projects"
              onClick={() => router.push("/Projects")}
            />
            <NavItems
              label={`Dashboard`}
              onClick={() => router.push(`/Dashboard/${context?.user?.uid}`)}
            />
          </div>
        </div>

        {context?.user ? (
          <div className="flex flex-col md:flex-row gap-x-5">
            <Button className="border-blue-700 text-blue-700" onClick={Logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-5">
            <Button
              className="border-blue-700 text-blue-700"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              className="text-white bg-blue-700"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
      <div>{children}</div>
    </>
  );
};
export default Container;
