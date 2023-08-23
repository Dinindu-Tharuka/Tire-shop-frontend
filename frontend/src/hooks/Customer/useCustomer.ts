import { useEffect, useState } from "react"
import CustomerService, { Customer } from "../../services/Customer/customer-service"


const useCustomer = () => {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [errorCustomerFetch, setErrorCustomerFetch] = useState('')

    useEffect(()=>{
        const {request, cancel} = CustomerService.getAll<Customer>()

        request
            .then(res => setCustomers(res.data))
            .catch(err => setErrorCustomerFetch(err.message !== 'canceled'? err.message : ''))
        return ()=> cancel();
    }, [])

    return {customers, setCustomers, errorCustomerFetch, setErrorCustomerFetch}

}

export default useCustomer