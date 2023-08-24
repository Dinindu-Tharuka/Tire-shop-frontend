import { useEffect, useState } from "react"
import CustomerService, { Customer, CustomerPageStructure } from "../../services/Customer/customer-service"

const useCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [errorCustomerFetch, setErrorCustomerFetch] = useState('')
    const [nextUrl, setNextUrl] = useState<string | null>('')
    const [previousUrl, setPreviousUrl] = useState<string | null>('')
    const [filterParams, setFilterParams] = useState<string | null>('')

    useEffect(()=>{
        const {request, cancel} = CustomerService.getAll<CustomerPageStructure>(filterParams)

        request
            .then(res => {              
                setCustomers(res.data.results)
                setNextUrl(res.data.next)
                setPreviousUrl(res.data.previous)
            }
            )
            .catch(err => setErrorCustomerFetch(err.message !== 'canceled'? err.message : ''))
        return ()=> cancel();
    }, [filterParams])

    return {customers, setCustomers, nextUrl, previousUrl, setFilterParams, filterParams}

}

export default useCustomer