import getProjectWithId from "@/actions/getProjectWithId"
import ApplicantClient from "./ApplicantClient"
import getApplicantsById from "@/actions/getApplicantsById"
const Applicants = async ({params}: {params: {id: string}}) => {
    const project = await getProjectWithId(params.id)
    const applicants = await getApplicantsById(params.id)
    return (
        <ApplicantClient applicants={applicants} project={project} />
    )
}
export default Applicants