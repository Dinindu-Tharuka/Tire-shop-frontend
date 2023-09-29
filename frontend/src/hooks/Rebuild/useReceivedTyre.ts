import { useEffect, useState } from "react"
import receivedTyreService, { ReceivedTyre, ReceivedtyrePageStructure } from "../../services/Rebuild/received-tyre-service"

const useReceivedTyre = () => {
    const [receivedTyres, setReceivedTyres] = useState<ReceivedTyre[]>([])
    const [errorFetchReceivedTyres, setErrorFetchReceivedTyres] = useState('')
    const [nextReceivedTyresUrl, setNextReceivedUrl] = useState<string | null>('')
    const [previousReceivedTyresUrl, setPreviousReceivedTyreUrl] = useState<string | null>('')
    const [filterReceivedTyreParams, setFilterReceivedTyreParams] = useState<string | null>('')
    const [isLoadingReceivedTyre, setIsLoadingReceivedTyre] = useState(false)
    const [receivedTyreCount, setReceivedTyreCount] =useState(0)
    const [receivedTyreNameFilter, setReceivedTyreNameFilter] = useState('')
    useEffect(()=>{
        setIsLoadingReceivedTyre(true)
        const {request, cancel} = receivedTyreService.getAll<ReceivedtyrePageStructure>(filterReceivedTyreParams)

        request
            .then(res => {
                setReceivedTyres(res.data.results)
                setNextReceivedUrl(res.data.next)
                setPreviousReceivedTyreUrl(res.data.previous)
                setIsLoadingReceivedTyre(false)
                setReceivedTyreCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchReceivedTyres(error.message !== 'canceled'? error.message : '' )
                setIsLoadingReceivedTyre(false)                
            })
            return ()=> cancel();
        }, [filterReceivedTyreParams, receivedTyreNameFilter])
  return {receivedTyres, setReceivedTyres, errorFetchReceivedTyres, setErrorFetchReceivedTyres, nextReceivedTyresUrl, previousReceivedTyresUrl, filterReceivedTyreParams, setFilterReceivedTyreParams, isLoadingReceivedTyre, receivedTyreCount, setReceivedTyreNameFilter}
}

export default useReceivedTyre