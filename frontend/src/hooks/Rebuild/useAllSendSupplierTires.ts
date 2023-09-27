import React, { useEffect, useState } from 'react'
import { SendSupplierTyre } from '../../services/Rebuild/send-tyre-service'
import allSendSupplierTyreService from '../../services/Rebuild/all-send-supplier-tyre-service'

const useAllSendSupplierTyres = () => {
    const [allSendSupplierTyres, setAllSendSupplierTyres] = useState<SendSupplierTyre[]>([])
    const [allSendTyresSupplierFetchError, setAllSendSupplierTyresFetchError] = useState('')

    useEffect(()=>{

        const {request, cancel} = allSendSupplierTyreService.getAll<SendSupplierTyre>()

        request
            .then(res => setAllSendSupplierTyres(res.data))
            .catch(error => setAllSendSupplierTyresFetchError(error.message))

            
        return ()=>cancel()
    },[])
  return {allSendSupplierTyres, setAllSendSupplierTyres, allSendTyresSupplierFetchError, setAllSendSupplierTyresFetchError}
}

export default useAllSendSupplierTyres