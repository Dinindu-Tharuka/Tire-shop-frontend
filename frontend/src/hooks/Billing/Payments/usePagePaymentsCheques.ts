import React, { useEffect, useState } from 'react'
import { PaymentCheque } from '../../../services/Billing/bill-page-service'
import pagePaymentChequesService, { PaymentChequePapeStructure } from '../../../services/Billing/Payments/page-payment-cheques-service'
const usePagePaymentscheques = () => {
    const [pagePaymentCheques, setPagePaymentCheques] = useState<PaymentCheque[]>([])
    const [pagePaymentChequesFetchError, setPagePaymentChequesFetchError] = useState('')
    const [isLoadingPagePaymentCheques, setIsLoadingPagePaymentCheques] = useState(false)
    const [nextpagePaymentChequesUrl, setnextpagePaymentChequesUrl] = useState<string | null>('')
    const [previousPagePaymentChequesUrl, setPreviousBillPageUrl] = useState<string | null>('')
    const [filterPagePaymentChequesParams, setFilterPagePaymentChequesParams] = useState<string | null>('')
    const [pagePaymentChequesCount, setPagePaymentChequesCount] = useState(0)   

    // Filtering 
    const [pagePaymentChequesStartDateFilter, setPAgePaymentChequesBillStartDateFilter] = useState('')
    const [pagePaymentChequesEndDateFilter, setPagePaymentChequesEndDateFilter] = useState('')

    useEffect(()=>{
        setIsLoadingPagePaymentCheques(true)
        const {request, cancel} = pagePaymentChequesService.getAll<PaymentChequePapeStructure>(filterPagePaymentChequesParams,  { params : { pagePaymentChequesStartDateFilter, pagePaymentChequesEndDateFilter}})   
        request     
            .then(res=> {
                setPagePaymentCheques(res.data.results)
                setnextpagePaymentChequesUrl(res.data.next)
                setPreviousBillPageUrl(res.data.previous)
                setPagePaymentChequesCount(res.data.count)
                setIsLoadingPagePaymentCheques(false)
            })
            .catch(error=>{
                setPagePaymentChequesFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingPagePaymentCheques(false)
            });
  
          return ()=>cancel();
      }, [pagePaymentChequesStartDateFilter, pagePaymentChequesEndDateFilter])
      
  return {pagePaymentCheques, setPagePaymentCheques, pagePaymentChequesFetchError, setPagePaymentChequesFetchError, isLoadingPagePaymentCheques, setIsLoadingPagePaymentCheques, setPAgePaymentChequesBillStartDateFilter, setPagePaymentChequesEndDateFilter, nextpagePaymentChequesUrl, previousPagePaymentChequesUrl, pagePaymentChequesCount, setFilterPagePaymentChequesParams}
}

export default usePagePaymentscheques