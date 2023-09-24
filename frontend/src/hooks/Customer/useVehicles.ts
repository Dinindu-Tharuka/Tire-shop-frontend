import { useEffect, useState } from "react"
import VehicleService, { Vehicle} from "../../services/Customer/vehicle-service"



const useVehicles = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [errorVehicleFetch, setErrorVehicleFetch] = useState('')
    const [vehicleNoFilter, setVehicleNoFilter] = useState('')

    useEffect(()=>{
        const {request, cancel} = VehicleService.getAll<Vehicle>({ params : { vehicleNoFilter }})

        request
            .then(res => {
              setVehicles(res.data)
              
            })
            .catch(err => setErrorVehicleFetch(err.message !== 'canceled'? err.message : ''))
        return ()=> cancel()
    }, [])
  return {vehicles, setVehicles, setVehicleNoFilter, errorVehicleFetch}
}

export default useVehicles