import { useEffect, useState } from "react"
import VehicleService, { Vehicle} from "../../services/Customer/vehicle-service"



const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [errorVehicleFetch, setErrorVehicleFetch] = useState('')

    useEffect(()=>{
        const {request, cancel} = VehicleService.getAll<Vehicle>()

        request
            .then(res => {
              setVehicles(res.data)
              
            })
            .catch(err => setErrorVehicleFetch(err.message !== 'canceled'? err.message : ''))
 
    }, [])
  return {vehicles, setVehicles}
}

export default useVehicles