import {
  Button,
  HStack,
  Input,
  Text,
  useColorMode,
  FormLabel,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import StockItemService, {
  StockItem,
} from "../../services/Stock/stock-item-service";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import { StockInvoice } from "../../services/Stock/stock-invoice-service";
import useItems from "../../hooks/Inventory/useItems";

interface Props {
  seletedInvoice: StockInvoice;
}

const StockAddItemForm = ({ seletedInvoice }: Props) => {
  const { register, handleSubmit } = useForm<StockItem>();
  const [errorStockItemUpdate, setErrorStockItemUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();
  const { items } = useItems();
  const { setStockItems, stockItems } = useContext(StockItemContext);
  const onUpdate = (data: StockItem) => {
    
  const newly = { ...data, stock_item_invoice: seletedInvoice.invoice_no };
    StockItemService.create(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Created Successfully" : "");
        setStockItems([res.data, ...stockItems]);
      })
      .catch((err) => setErrorStockItemUpdate(err.message));
  };
  return (
    <>
      {errorStockItemUpdate && (
        <Text textColor="#dd0939">{errorStockItemUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onUpdate)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75 d-flex justify-content-between">
            <FormLabel> Item </FormLabel>
            <Select {...register("item")} className="select p-2">
              {items.map((item, index) => (
                <option className="mt-3" key={index} value={item.item_id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel whiteSpace="nowrap"> Retail Price </FormLabel>
            <Input
              {...register("retail_price")}
              type="number"
              placeholder="Retail Price"
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Cost</FormLabel>
            <Input
              {...register("cost")}
              type="number"
              placeholder="Cost"
              width="50%"
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <FormLabel whiteSpace="nowrap">Selling Price</FormLabel>
            <Input
              {...register("selling_price")}
              type="number"
              placeholder="Selling Price"
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Discount</FormLabel>
            <Input
              {...register("discount")}
              type="number"
              placeholder="Discount"
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Qty</FormLabel>
            <Input
              {...register("qty")}
              type="number"
              placeholder="Qty"
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel whiteSpace="nowrap">Sold Qty</FormLabel>
            <Input
              {...register("sold_qty")}
              type="number"
              placeholder="Sold Qty"
              width="50%"
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorStockItemUpdate("");
              setSuccess("");
            }}
          >
            Add
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default StockAddItemForm;
