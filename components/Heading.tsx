import React from "react"
import { IconType } from "react-icons"

interface HeadingProps{
    icon ?: IconType,
    children: React.ReactNode,
}

const Heading: React.FC<HeadingProps> = ({
    icon : Icon, children
}) => {
    return (
        <div className="flex flex-row items-center gap-x-1">
            {Icon && (
                <div>
                    <Icon className="text-blue-700" size={30} />
                </div>
            )}
            {children}
        </div>
    )
}
export default Heading