import React, { useEffect, useState } from 'react'
import { PaymentCheque } from '../../../services/Billing/bill-page-service'
import allPaymentChequesService from '../../../services/Billing/Payments/all-payment-cheques-service'

const useAllPaymentscheques = () => {
    const [allPaymentCheques, setAllPaymentCheques] = useState<PaymentCheque[]>([])
    const [allPaymentChequesFetchError, setAllPaymentChequesFetchError] = useState('')
    const [isLoadingAllPaymentCheques, setIsLoadingAllPaymentCheques] = useState(false)

    // Filtering 
    const [allPaymentChequesStartDateFilter, setPaymentChequesBillStartDateFilter] = useState('')
    const [allPaymentChequesEndDateFilter, setAllPaymentChequesEndDateFilter] = useState('')

    useEffect(()=>{
        setIsLoadingAllPaymentCheques(true)
        const {request, cancel} = allPaymentChequesService.getAll<PaymentCheque>({params: { allPaymentChequesStartDateFilter, allPaymentChequesEndDateFilter}})   
        request     
            .then(res=> {
                setAllPaymentCheques(res.data)
                setIsLoadingAllPaymentCheques(false)
            })
            .catch(error=>{
                setAllPaymentChequesFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingAllPaymentCheques(false)
            });
  
          return ()=>cancel();
      }, [allPaymentChequesStartDateFilter, allPaymentChequesEndDateFilter])
      
  return {allPaymentCheques, setAllPaymentCheques, allPaymentChequesFetchError, setAllPaymentChequesFetchError, isLoadingAllPaymentCheques, setIsLoadingAllPaymentCheques, setPaymentChequesBillStartDateFilter, setAllPaymentChequesEndDateFilter}
}

export default useAllPaymentscheques