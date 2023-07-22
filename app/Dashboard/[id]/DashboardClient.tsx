"use client";

import { Project } from "@/types";
import Container from "@/components/Container";
import React, { useContext } from "react";
import { userContext } from "../../hooks/useUser";
import { useRouter } from "next/navigation";
import ProjectItem from "@/components/ProjectItem";

interface DashboardClientProps {
  id: string | null;
  projects?: Project[] | null;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ projects, id }) => {
  const user = useContext(userContext)?.user;
  const router = useRouter();
  if(id === null || user === null || projects === null){
    router.push('/login')
  }
  else if (user?.uid != id) {
    router.push('/')
  }
  const onclick = (id: string) => {
    // router.push(`/Projects/${id}`)
  };

  const onClickParticipants = (id: string) => {
    router.push(`/applicants/${id}`)
  };

  return (
    <Container>
      <div className="md:px-24 lg:px-40 xl:px-64 mt-8 px-10 flex flex-col gap-y-6">
        {projects && projects.length === 0 && (
          <div className="text-neutral-500 flex justify-center items-start w-full">
            You have not created any projects
          </div>
        )}
        {projects && projects?.length !== 0 &&
          projects.map((project, idx) => (
            <ProjectItem
              key={idx}
              project={project}
              onClick={onclick}
              showApplicants
              onClickParticipants={onClickParticipants}
            />
          ))}
      </div>
    </Container>
  );
};
export default DashboardClient;
