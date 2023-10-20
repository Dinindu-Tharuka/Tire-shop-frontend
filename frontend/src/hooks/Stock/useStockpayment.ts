import React, { useEffect, useState } from 'react'
import stockPaymentService, { StockPayment } from '../../services/Stock/stock-payment-service'


const useStockpayment = () => {
    const [stockPayments, setStockPayments] = useState<StockPayment[]>([])
    const [stockPaymentsFetchError, setStockPaymentsFetchError] = useState('')

    const [refetchStockPayments, setRefetchStockPayments] = useState('')
  
    useEffect(()=>{

        const { request, cancel} = stockPaymentService.getAll<StockPayment>()

        request
            .then(res=>setStockPayments([...res.data]))
            .catch(error => {
                if (error.message !== 'canceled'){
                    setStockPaymentsFetchError(error.message)
                }
            })
        return ()=> cancel();
    }, [refetchStockPayments])

    return {stockPayments, setStockPayments, stockPaymentsFetchError, setStockPaymentsFetchError, setRefetchStockPayments}
}

export default useStockpayment