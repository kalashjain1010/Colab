import ProfileCient from './ProfileCient'
import getUserWithId from '@/actions/getUserWithId'

const Profile = async ({params} : {params: {id: string}}) => {
    const userDetails = await getUserWithId(params.id)
    return (
        <ProfileCient userDetails={userDetails} />
    )
}
export default Profile