'use client'

import { userContext } from "@/app/hooks/useUser"
import ErrorPage from "@/components/ErrorPage"
import { UserDetails } from "@/types"
import { useRouter } from "next/navigation"
import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"

interface ProfileClientProps{
    userDetails: UserDetails | null
}

const ProfileCient: React.FC<ProfileClientProps> = ({userDetails}) => {
    const router = useRouter()
    
    const [disabled, setDisabled] = useState(false)

    const context = useContext(userContext)
    const user = context?.user

    // useEffect(() => {
    //     if(!user) return

    // }, [user])

    if(!userDetails){
        return (
            <ErrorPage errorLabel="No User Found" />
        )
    }
    
    
    return (
        <div>
                profile client
        </div>
    )
}
export default ProfileCient