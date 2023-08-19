import { useEffect, useState } from "react"
import CategoryService,{ Category } from "../../services/Inventory/category-service"


const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [error, setError] = useState('')

    useEffect(()=>{
        const {request, cancel} = CategoryService.getAll<Category>()

        request
            .then(res => setCategories(res.data))
            .catch(error => setError(error.message !== 'canceled'? error.mesage : ''))

            return ()=> cancel();
        }, [])

        return {categories, error, setCategories, setError}  
}

export default useCategory