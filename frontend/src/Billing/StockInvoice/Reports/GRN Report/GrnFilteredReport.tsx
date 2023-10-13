import { StockItemDefault } from "../../../../services/Stock/stock-item-service"
import { useContext, useEffect, useRef, useState } from "react";
import { Button, HStack, ModalHeader, Text } from "@chakra-ui/react";
import DownloadPdf from '../../../../PDF/DownloadPdf'
import { makeUpDate } from "../../../UI/MakeUpDate";
import { AllItemContext } from "../../../../Contexts/Inventory/AllItemContest";



interface Props {
    stockItems:StockItemDefault[]
}

const GrnFilteredReport = ({ stockItems }:Props) => {
     // For downloading pdf
  const [capture, setCapture] = useState<HTMLDivElement | null>(null);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const { allItems } = useContext(AllItemContext)
  useEffect(() => {
    setCapture(pdfRef.current);
  }, []);

  // date
  const currntDate = new Date();
  return (
    <>
      <div ref={pdfRef}>
        <ModalHeader>GRN Report</ModalHeader>
        <Text marginLeft={10}>
          {currntDate.getFullYear()}-{currntDate.getMonth() + 1}-
          {currntDate.getDate()}
        </Text>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Id</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Brand</th>
              <th scope="col">PR</th>
              <th scope="col">Qty</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>
            {stockItems?.map((stockitem) => (
              <tr key={stockitem.id}>
                <td>{stockitem.item}</td>
                <td>{allItems.find(item => item.item_id === stockitem.item)?.name}</td>
                <td>{allItems.find(item => item.item_id === stockitem.item)?.size}</td>
                <td>{allItems.find(item => item.item_id === stockitem.item)?.brand}</td>
                <td>{allItems.find(item => item.item_id === stockitem.item)?.plyrating}</td>
                <td>{stockitem.qty}</td>
                <td>{stockitem.cost}</td>
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
  )
}

export default GrnFilteredReport