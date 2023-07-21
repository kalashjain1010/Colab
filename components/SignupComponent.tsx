"use client";

import Input from "./Input";
import AuthModal from "./AuthModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '@/utils/firebase'
import { use, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userContext } from "@/app/hooks/useUser";
import { doc, setDoc } from "firebase/firestore";

const SignupComponent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    console.log([values.email, values.password]);

    try {

      const response = await createUserWithEmailAndPassword(auth, values.email, values.password)

      if(!response.user){
        return toast.error('Something went wrong')
      }

      const docRef = doc(db, 'users', response.user.uid)

      const makeNewUser = await setDoc(docRef, {
        name: values.name,
        email: values.email,
        applied: []
      })

      toast.success("Signup completed")

      // createUserWithEmailAndPassword(auth, values.email, values.password)
      //   .then((res) => toast.success("/user created"))
      //   .catch((error) => toast.error(error.message));
    } catch (error) {
      console.log(error);
    }
    router.push('/login')

    setIsLoading(false);
  };
  const body = (
    <>
      <div className="w-full mb-3">
        <div className="text-sm text-neutral-800">Name</div>
        <Input
          type="text"
          placeholder="Enter name"
          {...register("name", { required: true })}
        />
      </div>
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
      heading="Signup"
      onSubmit={onSubmit}
      imageSrc="/images/Allura UI Windows.svg"
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    >
      {body}
    </AuthModal>
  );
};
export default SignupComponent;
