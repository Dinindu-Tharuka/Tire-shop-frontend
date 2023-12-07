import React, { useEffect, useState } from 'react'
import { ReceivedSupplierTyre } from '../../../services/Rebuild/Received/received-tyre-service'
import allReceivedSupplierTyresService from '../../../services/Rebuild/Received/all-received-supplier-tyres-service'

const useAllReceivedSupplierTyres = () => {
    const [allReceivedSupplierTyres, setAllReceivedSupplierTyres] = useState<ReceivedSupplierTyre[]>([])
    const [allReceivedSupplierTyresFetchError, setAllReceivedSupplierTyresFetchError] = useState('')
    const [refetchallReceivedSupplierTyres, setRefetchallReceivedSupplierTyres] = useState('')


    useEffect(()=>{

        const {request, cancel} = allReceivedSupplierTyresService.getAll<ReceivedSupplierTyre>()

        request
            .then(res => setAllReceivedSupplierTyres(res.data))
            .catch(error => setAllReceivedSupplierTyresFetchError(error.message))            
        return ()=>cancel()
    },[refetchallReceivedSupplierTyres])
  return {allReceivedSupplierTyres, setAllReceivedSupplierTyres, allReceivedSupplierTyresFetchError, setAllReceivedSupplierTyresFetchError, setRefetchallReceivedSupplierTyres}
}

export default useAllReceivedSupplierTyres