import { useEffect, useState } from "react"
import BillService,{ Bill, BillPageStructure } from "../../services/Billing/bill-service"


const useBill = () => {
    const [bills, setBills] = useState<Bill[]>([])
    const [error, setError] = useState('')
    const [nextBillPageUrl, setnextBillPageUrl] = useState<string | null>('')
    const [previousBillPageUrl, setPreviousBillPageUrl] = useState<string | null>('')
    const [filterBillPageParams, setFilterBillPageParams] = useState<string | null>('')
    


    useEffect(()=>{
        const {request, cancel} = BillService.getAll<BillPageStructure>(filterBillPageParams)   
        request     
            .then(res=> {
                setBills(res.data.results)
                setnextBillPageUrl(res.data.next)
                setPreviousBillPageUrl(res.data.previous)
            })
            .catch(error=>setError(error.message === 'canceled'? '':error.message));
  
          return ()=>cancel();
      }, [filterBillPageParams])

    return {bills, setBills, nextBillPageUrl, previousBillPageUrl, filterBillPageParams, setFilterBillPageParams, error}
  
}

export default useBill