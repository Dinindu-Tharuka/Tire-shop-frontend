import { useEffect, useState } from "react"
import BillService,{ Bill, BillPageStructure } from "../../services/Billing/bill-service"


const useBill = () => {
    const [bills, setBills] = useState<Bill[]>([])
    const [billFetchError, setBillFetchError] = useState('')
    const [nextBillPageUrl, setnextBillPageUrl] = useState<string | null>('')
    const [previousBillPageUrl, setPreviousBillPageUrl] = useState<string | null>('')
    const [filterBillPageParams, setFilterBillPageParams] = useState<string | null>('')
    const [isLoadingBills, setIsLoadingBills] = useState(false)
    
    


    useEffect(()=>{
        setIsLoadingBills(true)
        const {request, cancel} = BillService.getAll<BillPageStructure>(filterBillPageParams)   
        request     
            .then(res=> {
                setBills(res.data.results)
                setnextBillPageUrl(res.data.next)
                setPreviousBillPageUrl(res.data.previous)
                setIsLoadingBills(false)
            })
            .catch(error=>{
                setBillFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingBills(false)
            });
  
          return ()=>cancel();
      }, [filterBillPageParams])

    return {bills, setBills, nextBillPageUrl, previousBillPageUrl, filterBillPageParams, setFilterBillPageParams, billFetchError, isLoadingBills}
  
}

export default useBill