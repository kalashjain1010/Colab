import {db} from '@/utils/firebase'
import {collection, getDocs, query, orderBy} from 'firebase/firestore'
import {Project} from '@/types'

const getProjects = async () => {
    const data : Project[] = []
    const ref = collection(db, 'projects')
    const projects = await getDocs(query(ref, orderBy('created_at', 'desc')))
    projects.forEach((doc) => {
        const project : Project = doc.data() as Project
        delete project.created_at
        project['id'] = doc.id
        data.push(project as Project)
    })

    return (data as Project[]) || null
}
export default getProjects