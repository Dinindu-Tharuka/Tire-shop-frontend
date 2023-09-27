import { useEffect, useState } from "react"
import { CustomerTakenTyre } from "../../services/Rebuild/tyre-taken-service"
import allCustomerTakenTyresService from "../../services/Rebuild/all-customer-taken-tyres-service"

const useAllCustomerTakentyres = () => {
    const [customerTyresTaken, setCustomerTyresTaken] = useState<CustomerTakenTyre[]>([])
    const [customerTyresTakenFetchError, setCustomerTyresTakenFetchError] = useState('')

    useEffect(()=>{
        const {request, cancel} = allCustomerTakenTyresService.getAll<CustomerTakenTyre>()

        request
            .then(res => setCustomerTyresTaken(res.data))
            .catch(error => setCustomerTyresTakenFetchError(error.message))

        return ()=>cancel();
    }, [])

        


  return {customerTyresTaken, setCustomerTyresTaken, customerTyresTakenFetchError, setCustomerTyresTakenFetchError}
}

export default useAllCustomerTakentyres