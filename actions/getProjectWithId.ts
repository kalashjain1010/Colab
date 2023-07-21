import { Project } from "@/types"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import {db} from '@/utils/firebase'

const getProjectWithId = async (id: string) => {
    if(!id){
        return null
    }
    const docRef = doc(db, 'projects', id)
    const project = await getDoc(docRef)
    if(project.exists()){
        const res = project.data() as Project
        delete res.created_at
        res['id'] = project.id
        return res as Project
    }
    else{
        return null
    }
}
export default getProjectWithId