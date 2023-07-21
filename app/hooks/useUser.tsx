'use client'

import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {auth} from '@/utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

type UserContextType = {
    user: User | null
}

export const userContext = createContext<UserContextType | undefined>(undefined)

export interface Props{
    [propName: string] : any
}

export const MyUserContextProvider = (props: Props) => {
    const [user, setUser] = useState<User | null>(null)

    const getUserDetails = () => {
        // TODO : Get user details
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        }, (error) => {
            toast.error(error.message)
        })
    }, [])

    const value = {user}

    return (
        <userContext.Provider value={value} {...props} />
    )
}
