import { useEffect, useState } from "react"
import rebuildReportService, { RebuildReport, RebuildReportPageStructure } from "../../services/Reports/rebuild-report-service";

const usePageRebuildReports = () => {
    const [rebuildPageReports, setRebuildPageReports] = useState<RebuildReport[]>([])
    const [errorFetchRebuildPageReports, setErrorFetchRebuildPageReports] = useState('');
    const [nextRebuildPageReportsUrl, setNextRebuildPageReportsUrl] = useState<string | null>('')
    const [previousRebuildPageReportsUrl, setPreviousRebuildPageReportsUrl] = useState<string | null>('')
    const [filterRebuildPageReportsParams, setFilterRebuildPageReportsParams] = useState<string | null>('')
    const [isLoadingRebuildPageReportsPage, setIsLoadingRebuildPageReportsPage] = useState(false)
    const [rebuildPageReportsCount, setRebuildPageReportsCount] = useState(0)
    const [reFetchPageReports, setReFetchPageReports] = useState('')

    // Filtering
    const [pageReportsRebuildIdFilter, setPageReportsRebuildIdFilter] = useState('')
    const [pageReportsJobNoFilter, setPageReportsJobNoFilter] = useState('')
    const [pageReportsCustomerFilter, setPageReportsCustomerFilter] = useState('')
    const [pageReportVehicleFilter, setPageReportVehicleFilter] = useState('')    

    useEffect(()=>{
      setIsLoadingRebuildPageReportsPage(true)
        const {request, cancel} = rebuildReportService.getAll<RebuildReportPageStructure>(filterRebuildPageReportsParams, { params : {pageReportsRebuildIdFilter, pageReportsJobNoFilter, pageReportsCustomerFilter, pageReportVehicleFilter}})
              
        request
          .then(res=>{
            setRebuildPageReports(res.data.results)
            setNextRebuildPageReportsUrl(res.data.next)
            setPreviousRebuildPageReportsUrl(res.data.previous)
            setRebuildPageReportsCount(res.data.count)
            setIsLoadingRebuildPageReportsPage(false)
          })
          .catch(err=> {
            setErrorFetchRebuildPageReports(err.message === 'canceled'?'':err.message)
            setIsLoadingRebuildPageReportsPage(false)
          })

        return ()=> cancel();
    }, [filterRebuildPageReportsParams, reFetchPageReports, pageReportsRebuildIdFilter, pageReportsJobNoFilter, pageReportsCustomerFilter, pageReportVehicleFilter])
  return {rebuildPageReports, setRebuildPageReports, errorFetchRebuildPageReports, setErrorFetchRebuildPageReports, nextRebuildPageReportsUrl, previousRebuildPageReportsUrl, setFilterRebuildPageReportsParams, rebuildPageReportsCount, isLoadingRebuildPageReportsPage, setReFetchPageReports, setPageReportsRebuildIdFilter, setPageReportsJobNoFilter, setPageReportsCustomerFilter, setPageReportVehicleFilter}
}

export default usePageRebuildReports