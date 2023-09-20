import { useEffect, useState } from "react"
import SupplierService, { Supplier, SupplierPageStructure } from "../../services/Registration/supplier-service"

const useSupplier = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([])
    const [errorFetchSupplier, setErrorFetchSupplier] = useState('');
    const [nextSupplierUrl, setNextSupplierUrl] = useState<string | null>('')
    const [previousSupplierUrl, setPreviousSupplierUrl] = useState<string | null>('')
    const [filterSupplierParams, setFilterSupplierParams] = useState<string | null>('')
    const [isLoadingSupplierPage, setIsLoadingSupplierPage] = useState(false)
    const [suppliersCount, setSuppliersCount] = useState(0)
    const [supplierNameFilter, setSupplierNameFilter] = useState('')

    useEffect(()=>{
      setIsLoadingSupplierPage(true)
        const {request, cancel} = SupplierService.getAll<SupplierPageStructure>(filterSupplierParams, {params:{ supplierNameFilter }})
        
        console.log('use',supplierNameFilter);
        
        request
          .then(res=>{
            setSuppliers(res.data.results)
            setNextSupplierUrl(res.data.next)
            setPreviousSupplierUrl(res.data.previous)
            setSuppliersCount(res.data.count)
            setIsLoadingSupplierPage(false)
          })
          .catch(err=> {
            setErrorFetchSupplier(err.message === 'canceled'?'':err.message)
            setIsLoadingSupplierPage(false)
          })

        return ()=> cancel();
    }, [filterSupplierParams, supplierNameFilter])
  return {suppliers, setSuppliers, errorFetchSupplier, nextSupplierUrl, previousSupplierUrl, filterSupplierParams, setFilterSupplierParams, suppliersCount, isLoadingSupplierPage, setErrorFetchSupplier, setSupplierNameFilter, supplierNameFilter}
}

export default useSupplier