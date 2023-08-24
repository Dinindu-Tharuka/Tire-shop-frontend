import { useEffect, useState } from "react"
import CategoryService,{ Category, CategoryPageStructure } from "../../services/Inventory/category-service"


const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [errorFetchCategory, setErrorFetchCategory] = useState('')
    const [nextCategoryUrl, setNextCategoryUrl] = useState<string | null>('')
    const [previousCategoryUrl, setpreviousCategoryUrl] = useState<string | null>('')
    const [filterCategoryParams, setFilterCategoryParams] = useState<string | null>('')

    useEffect(()=>{
        const {request, cancel} = CategoryService.getAll<CategoryPageStructure>(filterCategoryParams)

        request
            .then(res => {
                setCategories(res.data.results)
                setNextCategoryUrl(res.data.next)
                setpreviousCategoryUrl(res.data.previous)
            })
            .catch(error => setErrorFetchCategory(error.message !== 'canceled'? error.mesage : ''))

            return ()=> cancel();
        }, [filterCategoryParams])

        return {categories, errorFetchCategory, setCategories, nextCategoryUrl, previousCategoryUrl, filterCategoryParams, setFilterCategoryParams}  
}

export default useCategory