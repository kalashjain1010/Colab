import { UserDetails } from "@/types"
import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

const getUserWithId = async (id: string) => {
    const ref = doc(db, 'users', id)
    console.log(id)
    const user = await getDoc(ref)

    if(user.exists()){
        const data = user.data() as UserDetails
        if(data.applied){
            delete data['applied']
        }
        data['id'] = data.id
        return data as UserDetails
    }
    else{
        return null
    }

}
export default getUserWithId