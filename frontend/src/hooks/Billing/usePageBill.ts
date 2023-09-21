import { useEffect, useState } from "react"
import BillService,{ Bill, BillPageStructure } from "../../services/Billing/bill-page-service"


const usePageBill = () => {
    const [bills, setBills] = useState<Bill[]>([])
    const [billFetchError, setBillFetchError] = useState('')
    const [nextBillPageUrl, setnextBillPageUrl] = useState<string | null>('')
    const [previousBillPageUrl, setPreviousBillPageUrl] = useState<string | null>('')
    const [filterBillPageParams, setFilterBillPageParams] = useState<string | null>('')
    const [isLoadingBills, setIsLoadingBills] = useState(false)
    const [billCount, setBillCount] = useState(0)   
    const [billIdFilter, setBillIdFilter] = useState('')
    const [billFilterCustomer, setBillFilterCustomer] = useState('')


    useEffect(()=>{
        setIsLoadingBills(true)
        const {request, cancel} = BillService.getAll<BillPageStructure>(filterBillPageParams, {params: { billIdFilter, billFilterCustomer }})   
        request     
            .then(res=> {
                setBills(res.data.results)
                setnextBillPageUrl(res.data.next)
                setPreviousBillPageUrl(res.data.previous)
                setIsLoadingBills(false)
                setBillCount(res.data.count)
            })
            .catch(error=>{
                setBillFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingBills(false)
            });
  
          return ()=>cancel();
      }, [filterBillPageParams, billIdFilter, billFilterCustomer])

    return {bills, setBills, nextBillPageUrl, previousBillPageUrl, filterBillPageParams, setFilterBillPageParams, billFetchError, isLoadingBills, billCount, setBillFetchError, setBillIdFilter, setBillFilterCustomer}
  
}

export default usePageBill