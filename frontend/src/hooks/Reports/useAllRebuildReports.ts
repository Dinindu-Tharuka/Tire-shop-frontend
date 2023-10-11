import { useEffect, useState } from "react"
import allRebuildReportsService from "../../services/Reports/all-rebuild-reports-service";
import { RebuildReport } from "../../services/Reports/rebuild-report-service";

const useAllRebuildReports = () => {
    const [allRebuildReports, setAllRebuildReports] = useState<RebuildReport[]>([])
    const [errorFetchRebuildAllReports, setErrorFetchRebuildAllReports] = useState('');
    const [isLoadingRebuildAllReportsPage, setIsLoadingRebuildAllReportsPage] = useState(false)
    const [refetchRebuildAllReports, setRefetchRebuildAllReports] = useState('')

    // Filtering
    const [reportsRebuildIdFilter, setReportsRebuildIdFilter] = useState('')
    const [reportsJobNoFilter, setReportsJobNoFilter] = useState('')
    const [reportsCustomerFilter, setReportsCustomerFilter] = useState('')
    const [reportVehicleFilter, setReportVehicleFilter] = useState('')

    useEffect(()=>{
      setIsLoadingRebuildAllReportsPage(true)
        const {request, cancel} = allRebuildReportsService.getAll<RebuildReport>({ params:{ reportsRebuildIdFilter, reportsJobNoFilter, reportsCustomerFilter, reportVehicleFilter}})      
        
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
    }, [refetchRebuildAllReports, reportsRebuildIdFilter, reportsJobNoFilter, reportsCustomerFilter, reportVehicleFilter])
  return {allRebuildReports, setAllRebuildReports, errorFetchRebuildAllReports, setErrorFetchRebuildAllReports, isLoadingRebuildAllReportsPage, setRefetchRebuildAllReports, setReportsRebuildIdFilter, setReportsJobNoFilter, setReportsCustomerFilter, setReportVehicleFilter }
}

export default useAllRebuildReports