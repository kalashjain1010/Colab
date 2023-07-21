'use client'

import useProject from "@/app/hooks/useProject"
import CreateProjectModal from "./CreateProjectModal"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Input from "./Input"
import { useContext, useState } from "react"
import Button from "./Button"
import {app, db} from '@/utils/firebase'
import { userContext } from "@/app/hooks/useUser"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { FieldValue, Timestamp, addDoc, collection, serverTimestamp } from "firebase/firestore"

const CreateProject = () => {
    const {isOpen, onClose, onOpen} = useProject()
    const context = useContext(userContext)
    const [isLoading, setisLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
          title: "",
          description: ""
        },
      });
    const onChange = (open : boolean) => {
        if(open){
            onOpen()
        }
        else{
            onClose()
        }
        
    }
    const onSubmitHandler: SubmitHandler<FieldValues> = async (values) => {
        setisLoading(true)
        try{
            const docRef = await addDoc(collection(db, 'projects'), {
                title: values.title,
                description: values.description,
                user_id: context?.user?.uid,
                applicants: [],
                created_at: serverTimestamp()
            })

            toast.success(`project added`)
        }
        catch(error){
            toast.error('Something went wrong')
        }
        router.refresh()
        setisLoading(false)
        reset()
        onClose()
    }
    return (
        <CreateProjectModal isOpen={isOpen} onChange={onChange} title="Create Project Post">
            <form action="" onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-y-4">
                <div>
                <label className="text-sm text-neutral-800">Project Title</label>
                <Input type="text" disabled={isLoading} {...register('title', {required: true})}  />
                </div>
                
                <div>
                <label className="text-sm text-neutral-800">Project Description</label>
                <Input type="text" disabled={isLoading} {...register('description', {required: true})} className="min-h-[100px]" placeholder="Write an overview of your project. What is the purpose, goal and skills needed?" />
                </div>
                <Button type="submit" disabled={isLoading}>Create Project</Button>
            </form>
        </CreateProjectModal>
    )
}
export default CreateProject