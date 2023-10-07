import AllStockItemsContext from "../../../Contexts/Stock/AllStockItemContext";
import StockItemContext from "../../../Contexts/Stock/StockItemContext";
import { Item } from "../../../services/Inventory/item-page-service";
import calculateStockitemCount from "../Calculations/CountStockItems";
import { useContext } from 'react'

interface Props {
  items: Item[];
}

const FilteredItemShow = ({ items }: Props) => {
    const { stockItems } = useContext(AllStockItemsContext)
    
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Brand</th>
            <th scope="col">Size</th>
            <th scope="col" >Stock Count</th>           
          </tr>
        </thead>
        <tbody>
        {items?.map((item) => (
              <tr key={item.item_id} >                
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.size}</td>
                <td>{calculateStockitemCount(item, stockItems)}</td>
                
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default FilteredItemShow;
