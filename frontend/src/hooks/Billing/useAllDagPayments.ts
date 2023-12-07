import React, { useEffect, useState } from 'react'
import { Bill, DagPayment } from '../../services/Billing/bill-page-service'
import allDagPaymentService from '../../services/Billing/all-dag-payment-service'

const useAllDagPayments = () => {
    const [allDagPayments, setAllDagPayments] = useState<DagPayment[]>([])
    const [allDagPaymentsFetchError, setAllDagPaymentsFetchError] = useState('')
    const [isLoadingallDagPayments, setIsLoadingallDagPayments] = useState(false)
    const [reFetchAllDagPayments, setReFetchAllDagPayments] = useState('')

    useEffect(()=>{
        setIsLoadingallDagPayments(true)
        const {request, cancel} = allDagPaymentService.getAll<DagPayment>()   
        request     
            .then(res=> {
                setAllDagPayments(res.data)
                setIsLoadingallDagPayments(false)
            })
            .catch(error=>{
                setAllDagPaymentsFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingallDagPayments(false)
            });
  
          return ()=>cancel();
      }, [reFetchAllDagPayments])
      
  return {allDagPayments, setAllDagPayments, allDagPaymentsFetchError, setAllDagPaymentsFetchError, isLoadingallDagPayments, setIsLoadingallDagPayments, setReFetchAllDagPayments}
}

export default useAllDagPayments