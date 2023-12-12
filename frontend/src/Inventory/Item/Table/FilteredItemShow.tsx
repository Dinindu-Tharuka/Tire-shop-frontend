import AllStockItemsContext from "../../../Contexts/Stock/AllStockItemContext";
import { Item } from "../../../services/Inventory/item-page-service";
import calculateStockitemCount from "../Calculations/CountStockItems";
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import DownloadPdf from "../../../PDF/DownloadPdf";

interface Props {
  items: Item[];
}

const FilteredItemShow = ({ items }: Props) => {
  // contexts & hooks
  const { stockItems } = useContext(AllStockItemsContext);

  // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  // date
  const currntDate = new Date();

  return (
    <>
      <div ref={pdfRef}>
        <ModalHeader>Stock In Hand Report</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Size</th>
              <th scope="col">Stock Count</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.item_id}>
                <td>{item.item_id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.size}</td>
                <td>{calculateStockitemCount(stockItems, item )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <HStack>
        <Button onClick={() => DownloadPdf(capture, setLoader)} bg="red.300">
          PDF
        </Button>
      </HStack>
    </>
  );
};

export default FilteredItemShow;
