import { useEffect, useState } from "react"
import userProfileService, { UserProfile } from "../../services/User/user-profile-service";

const useUserProfile = () => {
    const [userProfiles, setUsersProfiles] = useState<UserProfile[]>([])
    const [errorFetchUserProfiles, setErrorFetchUserProfiles] = useState('')
    const [isLoadingUserProfile, setIsLoadingUserProfiles] = useState(false) 


    useEffect(()=>{
        const {request, cancel} = userProfileService.getAll<UserProfile>()
        request
          .then(res=>{            
            setUsersProfiles(res.data)       
            setIsLoadingUserProfiles(false)
          })
          .catch(err=> setErrorFetchUserProfiles(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {userProfiles, setUsersProfiles, errorFetchUserProfiles, setErrorFetchUserProfiles, isLoadingUserProfile}
}

export default useUserProfile