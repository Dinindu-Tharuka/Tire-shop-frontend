import React, { useEffect, useState } from 'react'
import { SendTyre } from '../../services/Rebuild/send-tyre-service'
import allSendTyresService from '../../services/Rebuild/all-send-tyres-service'

const useAllSendTyres = () => {
    const [allSendTyres, setAllSendTyres] = useState<SendTyre[]>([])
    const [allSendTyresFetchError, setAllSendTyresFetchError] = useState('')

    useEffect(()=>{

        const {request, cancel} = allSendTyresService.getAll<SendTyre>()

        request
            .then(res => setAllSendTyres(res.data))
            .catch(error => setAllSendTyresFetchError(error.message))

            
        return ()=>cancel()
    },[])
  return {allSendTyres, setAllSendTyres, allSendTyresFetchError, setAllSendTyresFetchError}
}

export default useAllSendTyres