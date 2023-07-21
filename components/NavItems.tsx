'use client'

import { usePathname, useRouter } from "next/navigation";
import React from "react";


interface NavItemsLabel{
    label: string;
    onClick: () => void
}
const NavItems: React.FC<NavItemsLabel> = ({
    label, onClick
}) => {
    const path = usePathname().split("/")[1]
    console.log(path)
    const router = useRouter()
    return (
        <div className={`flex items-center justify-center cursor-pointer px-3 hover:text-neutral-700 transition ${path === label && 'font-semibold text-blue-800'}`} onClick={onClick}>
            {label}
        </div>
    )
}
export default NavItems