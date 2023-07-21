'use client'

import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface CreateProjectModal {
  title?: string;
  description?: string;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
  isOpen: boolean;
}

const CreateProjectModal: React.FC<CreateProjectModal> = ({
  title,
  description,
  onChange,
  children,
  isOpen,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blue-50/90 backdrop-blur-sm fixed inset-0" />
        <Dialog.Content
          className="
                fixed
                drop-shadow-sm
                border
                top-[50%]
                left-[50%]
                translate-x-[-50%]
                translate-y-[-50%]
                max-h-full
                h-full
                md:h-auto
                w-full
                md:w-[80vw]
                lg:w-[70vw]
                xl:[60vw]
                rounded-md
                bg-neutral-50
                p-10
                focus:outline-none"
        >
          <Dialog.Title className="text-xl text-center font-bold mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-center text-sm mb-5 leading-normal">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close
            asChild
            className="absolute top-[10px] right-[10px] hover:text-black text-neutral-500 items-center inline-flex rounded-full focus:outline-none cursor-pointer transition"
          >
            <IoMdClose />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CreateProjectModal;
