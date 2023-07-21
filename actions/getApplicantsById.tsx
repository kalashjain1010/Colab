import { Applicant } from "@/types"
import { db } from "@/utils/firebase"
import { collection, getDocs } from "firebase/firestore"

const getApplicantsById = async (project_id: string) => {
    if(!project_id) return null
    
    const collectionRef = collection(db, 'projects', project_id, 'applicants')

    const applicants: Applicant[] = []

    const response = await getDocs(collectionRef)
    response.forEach((ret) => {
        const applicant: Applicant = ret.data() as Applicant
        applicant['id'] = ret.id
        applicants.push(applicant)
    })

    return applicants
}
export default getApplicantsById