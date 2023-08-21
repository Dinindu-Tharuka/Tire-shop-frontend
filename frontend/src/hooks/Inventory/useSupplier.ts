import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SupplierService, { Supplier } from "../../services/Inventory/supplier-service"

const useSupplier = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [errorFetchSupplier, setErrorFetchSupplier] = useState('');

    useEffect(()=>{
        const {request, cancel} = SupplierService.getAll<Supplier>()
        request
          .then(res=>setSuppliers(res.data))
          .catch(err=> setErrorFetchSupplier(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [])
  return {suppliers, errorFetchSupplier, setSuppliers, setErrorFetchSupplier}
}

export default useSupplier