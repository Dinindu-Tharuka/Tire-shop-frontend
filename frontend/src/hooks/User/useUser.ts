import { useEffect, useState } from "react"
import UserService, { User, UserPageStructure } from "../../services/User/user-service";

const useUser = () => {
    const [users, setUsers] = useState<User[]>([])
    const [errorFetchStockItems, setErrorFetchStockItems] = useState('')
    const [nextUserPageUrl, setNextUserPageUrl] = useState<string | null>('')
    const [previousUserPageUrl, setPreviousUserPageUrl] = useState<string | null>('')
    const [filterUserPageParams, setFilterUserPageParams] = useState<string | null>('')
    const [isLoadingUsers, setIsLoadingUsers] = useState(false) 
    const [userCount, setUserCount] = useState(0)

    useEffect(()=>{
        const {request, cancel} = UserService.getAll<UserPageStructure>(filterUserPageParams)
        request
          .then(res=>{
            setUsers(res.data.results)
            setNextUserPageUrl(res.data.next)
            setPreviousUserPageUrl(res.data.previous)
            setIsLoadingUsers(false)
            setUserCount(res.data.count)
          })
          .catch(err=> setErrorFetchStockItems(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {users, setUsers, errorFetchStockItems, nextUserPageUrl, previousUserPageUrl, setFilterUserPageParams, isLoadingUsers, userCount}
}

export default useUser