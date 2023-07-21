'use client'

import Container from "@/components/Container";
import { Applicant, Project } from "@/types";
import React from "react";
import ApplicantList from "@/components/ApplicantList";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ApplicantClientProps {
  applicants: Applicant[] | null;
  project: Project | null;
}

const ApplicantClientProps: React.FC<ApplicantClientProps> = ({
  applicants,
  project,
}) => {
  const router = useRouter()
  if (applicants == null || applicants.length === 0) {
    return (
        <Container>
            <div className="flex items-center justify-center w-full h-20 text-neutral-500">
                You have no applicants
            </div>
        </Container>
    )
  }

  const onClickInterested = async (user_id: string) => {
    if (!project) {
      return;
    }

    try {
      const docRef = doc(db, "projects", project.id, "applicants", user_id);
      await updateDoc(docRef, {
        status: "accepted",
      });
      router.refresh()
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center h-screen">
        <div className="min-h-fit w-[80vw] md:w-[60vw] xl:w-[50vw] bg-blue-200 flex flex-col gap-y-3 p-4 md:p-8 xl:p-10 rounded-2xl">
          <h1 className="font-semibold text-3xl">Applicant List</h1>
          <div className="font-semibold text-xl text-neutral-900">
            {project?.title}
          </div>
          <div>
            {applicants.map((applicant) => (
              <ApplicantList
                key={applicant.id}
                details={applicant}
                onClickInterested={onClickInterested}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ApplicantClientProps;
