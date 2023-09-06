import { useEffect, useState } from "react"
import UserService, { User, UserPageStructure } from "../../services/User/user-service";

const useUser = () => {
    const [users, setUsers] = useState<User[]>([])
    const [errorFetchUsers, setErrorFetchUser] = useState('')
    const [isLoadingUsers, setIsLoadingUsers] = useState(false) 


    useEffect(()=>{
        const {request, cancel} = UserService.getAll<User>()
        request
          .then(res=>{
            console.log('res', res);
            
            setUsers(res.data)
            
        
            setIsLoadingUsers(false)
          })
          .catch(err=> setErrorFetchUser(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {users, setUsers, errorFetchUsers, setErrorFetchUser, isLoadingUsers}
}

export default useUser