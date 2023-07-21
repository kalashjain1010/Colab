"use client";

import { Applicant } from "@/types";
import React, { useState } from "react";
// import { AiOutlineUser } from "react-icons/ai";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { TbWorldWww } from "react-icons/tb";

interface ApplicantListProps {
  details: Applicant;
  onClickInterested: (id: string) => void;
}

const ApplicantList: React.FC<ApplicantListProps> = ({
  details,
  onClickInterested,
}) => {
  const router = useRouter();
  return (
    <div className="">
      <div className="flex flex-row items-center p-4 justify-between hover:bg-blue-400/30 transition border border-transparent rounded-xl">
        <div className="flex flex-row items-center gap-x-2">
          <TbWorldWww
            onClick={() =>  window.open(details.linkedin, '_blank')}
            size={25}
            className="text-neutral- cursor-pointer"
            target="_blank"
          />
          <p className="cursor-default">{details.name}</p>
        </div>
        <Button
          onClick={() => onClickInterested(details.id)}
          disabled={details.status === "accepted"}
          className={`w-fit disabled:cursor-not-allowed ${
            details.status === "pending"
              ? "bg-blue-800 text-white"
              : "bg-white text-blue-800 border border-blue-800"
          }`}
        >
          {details.status === "pending" ? "Interested" : "Accepted"}
        </Button>
      </div>

      <div
        className={`${
          details.status === "accepted" ? "block" : "hidden"
        } grid grid-cols-2 p-4`}
      >
        <div>
          <div className="text-lg font-semibold">Email</div>
          <div>{details.email}</div>
        </div>
        <div>
          <div className="text-lg font-semibold">Phone number</div>
          <div>{details.phone_number}</div>
        </div>
      </div>

      <div
        className={`${
          details.status === "accepted" ? "block" : "hidden"
        } h-[1px] w-full bg-slate-400/50`}
      ></div>
    </div>
  );
};
export default ApplicantList;
