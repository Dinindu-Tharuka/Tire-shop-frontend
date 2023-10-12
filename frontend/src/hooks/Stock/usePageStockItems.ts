import { useEffect, useState } from "react"
import stockItemsPageService, { StockItemsPageStructure } from "../../services/Stock/stock-items-page-service"
import { StockItem } from "../../services/Stock/stock-item-service"

const usePageStockItems = () => {
    const [pageStockItems, setPageStockItems] = useState<StockItem[]>([])
    const [errorFetchPageStockItems, setErrorFetchPageStockItems] = useState('')
    const [nextPageStockItemsTyresUrl, setNextPageStockItemsUrl] = useState<string | null>('')
    const [previousPageStockItemsUrl, setPreviousPageStockItemsUrl] = useState<string | null>('')
    const [filterPageStockItemsParams, setFilterPageStockItemsParams] = useState<string | null>('')
    const [isLoadingPageStockItems, setIsLoadingPageStockItems] = useState(false)
    const [pageStockItemsCount, setPageStockItemsCount] =useState(0)
    const [pageStockItemsFilter, setPageStockItemsNameFilter] = useState('')

    useEffect(()=>{
        setIsLoadingPageStockItems(true)
        const {request, cancel} = stockItemsPageService.getAll<StockItemsPageStructure>(filterPageStockItemsParams)

        request
            .then(res => {
                setPageStockItems(res.data.results)
                setNextPageStockItemsUrl(res.data.next)
                setPreviousPageStockItemsUrl(res.data.previous)
                setIsLoadingPageStockItems(false)
                setPageStockItemsCount(res.data.count)
            })
            .catch(error => {
                setErrorFetchPageStockItems(error.message !== 'canceled'? error.message : '' )
                setIsLoadingPageStockItems(false)                
            })
            return ()=> cancel();
        }, [filterPageStockItemsParams, pageStockItemsFilter])
  return {pageStockItems, setPageStockItems, errorFetchPageStockItems, setErrorFetchPageStockItems, nextPageStockItemsTyresUrl, previousPageStockItemsUrl, filterPageStockItemsParams, setFilterPageStockItemsParams, isLoadingPageStockItems, pageStockItemsCount, setPageStockItemsNameFilter}
}

export default usePageStockItems