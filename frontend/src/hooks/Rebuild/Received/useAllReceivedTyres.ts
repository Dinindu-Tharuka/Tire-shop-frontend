import React, { useEffect, useState } from 'react'
import { ReceivedTyre } from '../../../services/Rebuild/Received/received-tyre-service'
import allReceivedTyresService from '../../../services/Rebuild/Received/all-received-tyres-service'

const useAllReceivedTyres = () => {
    const [allReceivedTyres, setAllReceivedTyres] = useState<ReceivedTyre[]>([])
    const [allReceivedTyresFetchError, setAllReceivedTyresFetchError] = useState('')

    useEffect(()=>{

        const {request, cancel} = allReceivedTyresService.getAll<ReceivedTyre>()

        request
            .then(res => setAllReceivedTyres(res.data))
            .catch(error => setAllReceivedTyresFetchError(error.message))            
        return ()=>cancel()
    },[])
  return {allReceivedTyres, setAllReceivedTyres, allReceivedTyresFetchError, setAllReceivedTyresFetchError}
}

export default useAllReceivedTyres