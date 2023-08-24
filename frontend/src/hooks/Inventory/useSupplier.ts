import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SupplierService, { Supplier, SupplierPageStructure } from "../../services/Inventory/supplier-service"

const useSupplier = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [errorFetchSupplier, setErrorFetchSupplier] = useState('');
    const [nextSupplierUrl, setNextSupplierUrl] = useState<string | null>('')
    const [previousSupplierUrl, setPreviousSupplierUrl] = useState<string | null>('')
    const [filterSupplierParams, setFilterSupplierParams] = useState<string | null>('')

    useEffect(()=>{
        const {request, cancel} = SupplierService.getAll<SupplierPageStructure>(filterSupplierParams)
        request
          .then(res=>{
            setSuppliers(res.data.results)
            setNextSupplierUrl(res.data.next)
            setPreviousSupplierUrl(res.data.previous)
          })
          .catch(err=> setErrorFetchSupplier(err.message === 'canceled'?'':err.message))

        return ()=> cancel();
    }, [filterSupplierParams])
  return {suppliers, setSuppliers, errorFetchSupplier, nextSupplierUrl, previousSupplierUrl, filterSupplierParams, setFilterSupplierParams}
}

export default useSupplier