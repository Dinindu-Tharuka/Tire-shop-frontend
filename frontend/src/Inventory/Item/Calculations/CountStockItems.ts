import { Item } from "../../../services/Inventory/item-page-service";
import { StockItem } from "../../../services/Stock/stock-item-service";

const calculateStockitemCount = (item:Item, stockItems:StockItem[])=>{
    let count = 0;
    stockItems.forEach((stock) => {
      if (stock.item === item.item_id) {
        count += stock.qty;
      }
    });

    return "" + count;
}

export default calculateStockitemCount