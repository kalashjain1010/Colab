"use client";

import Input from "./Input";
import AuthModal from "./AuthModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useContext, useState } from "react";
import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((user) => {
        toast.success("logged in");
      })
      .catch((error) => toast.error(error.message));
    setIsLoading(false);
  };
  const body = (
    <>
      <div className="w-full mb-3">
        <div className="text-sm text-neutral-800">Email Address</div>
        <Input
          type="text"
          placeholder="Enter email address"
          {...register("email", { required: true })}
        />
      </div>
      <div className="w-full mb-3">
        <div className="text-sm text-neutral-800">Password</div>
        <Input
          type="password"
          placeholder="Enter password"
          {...register("password", { required: true })}
        />
      </div>
    </>
  );
  return (
    <AuthModal
      heading="Login"
      onSubmit={onSubmit}
      imageSrc="/images/frame.svg"
      handleSubmit={handleSubmit}
      isLoading={loading}
    >
      {body}
    </AuthModal>
  );
};
export default LoginComponent;
