import { useEffect, useState } from "react"
import ServicesService, { Service, ServicePageStructure } from "../../services/Registration/services-service";


const useService = () => {
    const [services, setServices] = useState<Service[]>([])
    const [errorFetchService, setErrorFetchService] = useState('');
    const [nextServiceUrl, setNextServiceUrl] = useState<string | null>('')
    const [previousServiceUrl, setPreviousServiceUrl] = useState<string | null>('')
    const [filterServiceParams, setFilterServiceParams] = useState<string | null>('')
    const [isLaodingServicePage, setIsLaodingServicePage] = useState(false)
    const [servicesCount, setServicesCount] = useState(0)

    useEffect(()=>{
      setIsLaodingServicePage(true)
        const {request, cancel} = ServicesService.getAll<ServicePageStructure>(filterServiceParams)
        request
          .then(res=>{
            setServices(res.data.results)
            setNextServiceUrl(res.data.next)
            setPreviousServiceUrl(res.data.previous)
            setIsLaodingServicePage(false)
            setServicesCount(res.data.count)
          })
          .catch(err=> {
            setErrorFetchService(err.message === 'canceled'?'':err.message)
            setIsLaodingServicePage(false)
          })

        return ()=> cancel();
    }, [filterServiceParams])
  return {services, setServices, errorFetchService, nextServiceUrl, previousServiceUrl, filterServiceParams, setFilterServiceParams, isLaodingServicePage, servicesCount}
}

export default useService