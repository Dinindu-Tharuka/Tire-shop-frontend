import { useEffect, useState } from "react"
import allRebuildReportsService from "../../services/Reports/all-rebuild-reports-service";
import { RebuildReport } from "../../services/Reports/rebuild-report-service";

const useAllRebuildReports = () => {
    const [allRebuildReports, setAllRebuildReports] = useState<RebuildReport[]>([])
    const [errorFetchRebuildAllReports, setErrorFetchRebuildAllReports] = useState('');
    const [isLoadingRebuildAllReportsPage, setIsLoadingRebuildAllReportsPage] = useState(false)
    const [refetchRebuildAllReports, setRefetchRebuildAllReports] = useState('')

    useEffect(()=>{
      setIsLoadingRebuildAllReportsPage(true)
        const {request, cancel} = allRebuildReportsService.getAll<RebuildReport>()      
        
        request
          .then(res=>{
            setAllRebuildReports(res.data)
            setIsLoadingRebuildAllReportsPage(false)
          })
          .catch(err=> {
            setErrorFetchRebuildAllReports(err.message === 'canceled'?'':err.message)
            setIsLoadingRebuildAllReportsPage(false)
          })

        return ()=> cancel();
    }, [refetchRebuildAllReports])
  return {allRebuildReports, setAllRebuildReports, errorFetchRebuildAllReports, setErrorFetchRebuildAllReports, isLoadingRebuildAllReportsPage, setRefetchRebuildAllReports}
}

export default useAllRebuildReports