import getProjectWithId from "@/actions/getProjectWithId"
import getUserWithId from "@/actions/getUserWithId"
import Project from "@/components/Project"

const ProjectWithId = async ({params} : {params : {id: string}}) => {
    const project = await getProjectWithId(params.id)
    let projectUser = null
    if(project){
        projectUser = await getUserWithId(project.user_id)
    }
    return (
        <Project project={project} projectUser={projectUser} />
    )
}
export default ProjectWithId