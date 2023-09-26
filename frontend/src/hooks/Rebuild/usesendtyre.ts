import { useEffect, useState } from "react"
import sendTyreService, { SendTakenPageStructure, SendTyre } from "../../services/Rebuild/send-tyre-service"


const useSendtyre = () => {
    const [sendTyres, setSendTyres] = useState<SendTyre[]>([])
    const [errorFetchSendTyres, setErrorFetchSendTyres] = useState('')
    const [nextSendTyresUrl, setNextSendUrl] = useState<string | null>('')
    const [previousSendTyresUrl, setPreviousSendTyreUrl] = useState<string | null>('')
    const [filterSendTyreParams, setFilterSendTyreParams] = useState<string | null>('')
    const [isLoadingSendTyre, setIsLoadingSendTyre] = useState(false)
    const [sendTyreCount, setSendTyreCount] =useState(0)
    const [sendTyreNameFilter, setSendTyreNameFilter] = useState('')
    useEffect(()=>{
        setIsLoadingSendTyre(true)
        const {request, cancel} = sendTyreService.getAll<SendTakenPageStructure>(filterSendTyreParams)

        request
            .then(res => {
                setSendTyres(res.data.results)
                setNextSendUrl(res.data.next)
                setPreviousSendTyreUrl(res.data.previous)
                setIsLoadingSendTyre(false)
                setSendTyreCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchSendTyres(error.message !== 'canceled'? error.message : '' )
                setIsLoadingSendTyre(false)                
            })
            return ()=> cancel();
        }, [filterSendTyreParams, sendTyreNameFilter])
  return {sendTyres, setSendTyres, errorFetchSendTyres, setErrorFetchSendTyres, nextSendTyresUrl, previousSendTyresUrl, filterSendTyreParams, setFilterSendTyreParams, isLoadingSendTyre, sendTyreCount, setSendTyreNameFilter}
}

export default useSendtyre