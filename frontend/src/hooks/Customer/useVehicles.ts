import { useEffect, useState } from "react"
import VehicleService, { Vehicle } from "../../services/Customer/vehicle-service"


const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [vehicleFetchError, setVehicleFetchError] = useState('')

    useEffect(()=>{
        const {request, cancel} = VehicleService.getAll<Vehicle>()

        request
            .then(res => setVehicles(res.data))
            .catch(err => setVehicleFetchError(err.message !== 'canceled'? err.message : ''))
 
    })
  return {vehicles, setVehicles, vehicleFetchError, setVehicleFetchError}
}

export default useVehicles