import { useEffect, useState } from "react";
import { Supplier } from "../../services/Registration/supplier-service";
import allSupplierSevice from "../../services/Registration/all-supplier-sevice";


const useAllSuppliers = () => {

  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([])
  const [errorFetchAllSupplier, setErrorFetchAllSupplier] = useState('');
  const [isLoadingAllSupplierPage, setIsLoadingAllSupplierPage] = useState(false)
  useEffect(()=>{
    setIsLoadingAllSupplierPage(true)
      const {request, cancel} = allSupplierSevice.getAll<Supplier>()
      
      request
        .then(res=>{
          setAllSuppliers(res.data)
          setIsLoadingAllSupplierPage(false)
        })
        .catch(err=> {
          setErrorFetchAllSupplier(err.message === 'canceled'?'':err.message)
          setIsLoadingAllSupplierPage(false)
        })

      return ()=> cancel();
  }, [])

  return {allSuppliers, setAllSuppliers, errorFetchAllSupplier, setErrorFetchAllSupplier, isLoadingAllSupplierPage, setIsLoadingAllSupplierPage}
}

export default useAllSuppliers