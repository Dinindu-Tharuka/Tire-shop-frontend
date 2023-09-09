import React, { useEffect, useState } from 'react'
import { BillPayment } from '../../services/Billing/bill-page-service'
import billPaymentService from '../../services/Billing/bill-payment-service'

const useBillPayment = () => {
    const [billPayments, setBillPayments] = useState<BillPayment[]>([])
    const [billPaymentFetchError, setBillPaymentFetchError] = useState('')    
    const [isLoadingBillPayments, setIsLoadingBillPayments] = useState(false)

    useEffect(()=>{
        setIsLoadingBillPayments(true)
        const {request, cancel} = billPaymentService.getAll<BillPayment>()   
        request     
            .then(res=> {
                setBillPayments(res.data)
                setIsLoadingBillPayments(false)
            })
            .catch(error=>{
                setBillPaymentFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingBillPayments(false)
            });
  
          return ()=>cancel();

    }, [])
  return {billPayments, setBillPayments, billPaymentFetchError, setBillPaymentFetchError, isLoadingBillPayments, setIsLoadingBillPayments}
}

export default useBillPayment