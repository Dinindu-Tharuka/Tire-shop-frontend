import React, { useEffect, useState } from 'react'
import { Bill } from '../../services/Billing/bill-page-service'
import billService from '../../services/Billing/bill-service'

const useAllBill = () => {
    const [allBills, setAllBills] = useState<Bill[]>([])
    const [allBillFetchError, setAllBillFetchError] = useState('')
    const [isLoadingAllBills, setIsLoadingAllBills] = useState(false)

    // Filtering 
    const [allbillIdFilter, setAllBillIdFilter] = useState('')
    const [allbillFilterCustomer, setAllBillFilterCustomer] = useState('')
    const [allbillVehicleFilter, setAllBillVehicleFilter] = useState('')
    const [allbillStartDateFilter, setAllBillStartDateFilter] = useState('')
    const [allbillEndDateFilter, setAllBillEndDateFilter] = useState('')

    useEffect(()=>{
        setIsLoadingAllBills(true)
        const {request, cancel} = billService.getAll<Bill>({params: {allbillIdFilter, allbillFilterCustomer, allbillVehicleFilter, allbillStartDateFilter, allbillEndDateFilter}})   
        request     
            .then(res=> {
                setAllBills(res.data)
                setIsLoadingAllBills(false)
            })
            .catch(error=>{
                setAllBillFetchError(error.message === 'canceled'? '':error.message)
                setIsLoadingAllBills(false)
            });
  
          return ()=>cancel();
      }, [allbillIdFilter, allbillFilterCustomer, allbillVehicleFilter, allbillStartDateFilter, allbillEndDateFilter])
      
  return {allBills, setAllBills, allBillFetchError, setAllBillFetchError, isLoadingAllBills, setIsLoadingAllBills, setAllBillIdFilter, setAllBillFilterCustomer, setAllBillVehicleFilter, setAllBillStartDateFilter, setAllBillEndDateFilter}
}

export default useAllBill