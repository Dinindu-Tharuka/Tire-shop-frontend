import { useEffect, useState } from "react"
import CustomerService, { Customer, CustomerPageStructure } from "../../services/Customer/customer-service"

const useCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [errorCustomerFetch, setErrorCustomerFetch] = useState('')
    const [nextUrl, setNextUrl] = useState<string | null>('')
    const [previousUrl, setPreviousUrl] = useState<string | null>('')
    const [filterParams, setFilterParams] = useState<string | null>('')
    const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
    const [customerCount, setCustomerCount] = useState(0);
    const [customerNameFilter, setCustomerNameFilter] = useState('')

    useEffect(()=>{
        setIsLoadingCustomer(true)
        const {request, cancel} = CustomerService.getAll<CustomerPageStructure>(filterParams, {params : { customerNameFilter }})

        request
            .then(res => {              
                setCustomers(res.data.results)
                setNextUrl(res.data.next)
                setPreviousUrl(res.data.previous)
                setIsLoadingCustomer(false)
                setCustomerCount(res.data.count)
            }
            )
            .catch(err => {
                setErrorCustomerFetch(err.message !== 'canceled'? err.message : '')
                setIsLoadingCustomer(false)
            })
        return ()=> cancel();
    }, [filterParams])

    return {customers, setCustomers, nextUrl, previousUrl, setFilterParams, filterParams, errorCustomerFetch, setErrorCustomerFetch, isLoadingCustomer, customerCount, setCustomerNameFilter}

}

export default useCustomer