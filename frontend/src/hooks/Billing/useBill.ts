import React, { useEffect, useState } from 'react'
import { Bill } from '../../services/Billing/bill-page-service'
import billService from '../../services/Billing/bill-service'

const useBill = () => {
    const [bills, setBills] = useState<Bill[]>([])
    const [billFetchError, setBillFetchError] = useState('')
    const [isLoadingBills, setIsLoadingBills] = useState(false)

    useEffect(()=>{
        setIsLoadingBills(true)
        const {request, cancel} = billService.getAll<Bill>()   
        request     
            .then(res=> {
                setBills(res.data)
                setIsLoadingBills(false)
            })
            .catch(error=>{
                setBillFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingBills(false)
            });
  
          return ()=>cancel();
      }, [])
      
  return {bills, setBills, billFetchError, setBillFetchError, isLoadingBills, setIsLoadingBills}
}

export default useBill