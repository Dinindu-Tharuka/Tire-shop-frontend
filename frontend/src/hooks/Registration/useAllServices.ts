import React, { useEffect, useState } from 'react'
import { Service } from '../../services/Registration/services-service';
import allServicesService from '../../services/Registration/all-services-service';

const useAllServices = () => {
    const [allServices, setAllServices] = useState<Service[]>([])
    const [errorFetchAllService, setErrorFetchAllService] = useState('');    
    const [isLaodingAllService, setIsLaodingAllService] = useState(false);
    

    useEffect(()=>{
      setIsLaodingAllService(true)
        const {request, cancel} = allServicesService.getAll<Service>()
        request
          .then(res=>{
            setAllServices(res.data)
            setIsLaodingAllService(false)
          })
          .catch(err=> {
            setErrorFetchAllService(err.message === 'canceled'?'':err.message)
            setIsLaodingAllService(false)
          })

        return ()=> cancel();
    }, [])
  return {allServices, setAllServices, errorFetchAllService, setErrorFetchAllService, isLaodingAllService, setIsLaodingAllService}
}

export default useAllServices