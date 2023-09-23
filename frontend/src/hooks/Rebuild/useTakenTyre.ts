import { useEffect, useState } from "react"
import tyreTakenService, { TyreTaken, TyreTakenPageStructure } from "../../services/Rebuild/tyre-taken-service"


const useTyreTakenPagination = () => {
    const [takenTyres, setTakenTyres] = useState<TyreTaken[]>([])
    const [errorFetchTakenTyres, setErrorFetchTakenTyres] = useState('')
    const [nextTakenTyresUrl, setNextCategoryUrl] = useState<string | null>('')
    const [previousTakenTyresUrl, setPreviousTakenTyreUrl] = useState<string | null>('')
    const [filterTakenTyreParams, setFilterTakenTyreParams] = useState<string | null>('')
    const [isLoadingTakenTyre, setIsLoadingTakenTyre] = useState(false)
    const [takenTyreCount, setTakenTyreCount] =useState(0)
    const [takenTyreNameFilter, setTakenTyreNameFilter] = useState('')
    useEffect(()=>{
        setIsLoadingTakenTyre(true)
        const {request, cancel} = tyreTakenService.getAll<TyreTakenPageStructure>(filterTakenTyreParams)

        request
            .then(res => {
                setTakenTyres(res.data.results)
                setNextCategoryUrl(res.data.next)
                setPreviousTakenTyreUrl(res.data.previous)
                setIsLoadingTakenTyre(false)
                setTakenTyreCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchTakenTyres(error.message !== 'canceled'? error.message : '' )
                setIsLoadingTakenTyre(false)                
            })
            return ()=> cancel();
        }, [filterTakenTyreParams, takenTyreNameFilter])

        return {takenTyres, setTakenTyres, errorFetchTakenTyres, setErrorFetchTakenTyres, nextTakenTyresUrl, previousTakenTyresUrl, filterTakenTyreParams, setFilterTakenTyreParams, isLoadingTakenTyre, takenTyreCount, setTakenTyreNameFilter}  
}

export default useTyreTakenPagination