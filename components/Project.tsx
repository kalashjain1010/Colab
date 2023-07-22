"use client";

import { Project, UserDetails } from "@/types";
import React, { use, useContext, useState } from "react";
import Container from "./Container";
import Image from "next/image";
import Button from "./Button";
import { userContext } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import useApplyProject from "@/app/hooks/useApplyProject";
import CreateProjectModal from "./CreateProjectModal";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";

interface ProjectProps {
  project: Project | null;
  projectUser: UserDetails | null
}

const Project: React.FC<ProjectProps> = ({ project, projectUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const context = useContext(userContext);
  const user = context?.user;
  const { onOpen, isOpen, onClose } = useApplyProject();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      linkedin: "",
    },
  });

  const onClick = () => {
    if (!user) {
      router.push("/login");
    }

    // open the form modal to apply for project
    onOpen();
  };

  const onChange = (close: boolean) => {
    if (close) {
      onOpen();
    } else {
      onClose();
    }
  };

  const onSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    if (!user) {
      router.push("/login");
    }

    if (!project) {
      return;
    }

    try {
      const collectionRef = doc(
        db,
        "projects",
        project.id,
        "applicants",
        user?.uid as string
      );
      const response = await setDoc(collectionRef, {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        linkedin: values.linkedin,
        status: 'pending'
      });

      await updateDoc(doc(db, "projects", project.id), {
        applicants: arrayUnion(user?.uid as string),
      });

      await updateDoc(doc(db, "users", user?.uid as string), {
        applied: arrayUnion(project.id),
      });

      toast.success("applied");
    } catch (error) {
      console.log(error)
      toast.error("try again later");
    }
    router.refresh();
    setIsLoading(false);
    reset();
    onClose();
  };

  if (!project) {
    return <div>no project found</div>;
  }

  return (
    <>
      <Container>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex w-[80vw] md:w-[60vw] lg:w-[50vw] m-auto bg-blue-200 rounded-lg px-6 py-3">
            <div className="h-full w-35 pr-4 text-center">
              Posted By: <br />
              <span className="font-semibold">{projectUser?.name}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-y-4">
                <h1 className="text-xl font-semibold transform uppercase">
                  {project?.title}
                </h1>
                <div className="text-justify"><span className="font-semibold">Description</span> : {project?.description}</div>
                {user?.uid !== project.user_id && (
                  <Button
                    onClick={onClick}
                    disabled={
                      (user && project?.applicants?.indexOf(user.uid) != -1) ||
                      false
                    }
                    className="w-fit bg-blue-600 text-white px-4 py-2"
                  >
                    Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <CreateProjectModal
        title={project?.title}
        onChange={onChange}
        isOpen={isOpen}
      >
        <form
          action=""
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-y-4"
        >
          <div>
            <label className="text-sm text-neutral-800">Name</label>
            <Input
              type="text"
              disabled={isLoading}
              {...register("name", { required: true })}
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-800">Contact Email</label>
            <Input
              type="email"
              disabled={isLoading}
              {...register("email", { required: true })}
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-800">Phone Number</label>
            <Input
              type="number"
              disabled={isLoading}
              {...register("phone_number", { required: true })}
              placeholder="Enter Phone Number"
            />
          </div>
          <div>
            <label className="text-sm text-neutral-800">Linkedin Profile</label>
            <Input
              type="text"
              disabled={isLoading}
              {...register("linkedin", { required: true })}
              placeholder="Enter LinkedIn Profile URL"
            />
          </div>
          <div className="flex items-center w-full justify-center">
          <Button type="submit" disabled={isLoading} className="bg-blue-700 text-white w-auto px-8">
            Apply
          </Button>
          </div>
        </form>
      </CreateProjectModal>
    </>
  );
};
export default Project;
