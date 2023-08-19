import { useEffect, useState } from "react"
import SupplierService, { Supplier } from "../../services/Inventory/supplier-service"

const useSupplier = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [error, setError] = useState('');

    useEffect(()=>{
        const {request, cancel} = SupplierService.getAll<Supplier>()
        request
          .then(res=>setSuppliers(res.data))
          .catch(err=> setError(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {suppliers, error, setSuppliers, setError}
}

export default useSupplier