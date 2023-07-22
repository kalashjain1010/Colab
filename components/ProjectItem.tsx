"use client";

import { Project } from "@/types";
import React from "react";
import { BiRightArrow } from "react-icons/bi";

interface ProjectItemProps {
  project: Project;
  onClick: (id: string) => void;
  showApplicants?: boolean;
  onClickParticipants?: (id: string) => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  onClick,
  showApplicants,
  onClickParticipants
}) => {
  return (
    <div
      onClick={() => onClick(project.id)}
      className={`relative flex items-center justify-between bg-blue-100 hover:bg-blue-200 group rounded-2xl transform-gpu hover:scale-105 transition-all cursor-pointer ${showApplicants ? 'pl-8' : 'p-8'}`}
    >
      <div className="font-semibold text-xl">{project.title}</div>
      <div>
        {showApplicants && onClickParticipants ? (
          <div onClick={() => onClickParticipants(project.id)} className="bg-blue-700 relative min-h-[65px] min-w-[64px] flex items-center p-8 rounded-2xl rounded-tl-none rounded-bl-none text-white hover:bg-blue-800 transition">View  <br className="md:hidden" />Applicants</div>
        ) : (
          <BiRightArrow
            size={30}
            className="group-hover:transform group-hover:translate-x-4 transition text-slate-600"
          />
        )}
      </div>
    </div>
  );
};
export default ProjectItem;
