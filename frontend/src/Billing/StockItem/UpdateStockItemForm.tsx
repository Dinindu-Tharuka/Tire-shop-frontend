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
import { FieldValues, useForm } from "react-hook-form";
import StockItemService, {
  StockItem,
} from "../../services/Stock/stock-item-service";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import useItemsPagination from "../../hooks/Inventory/useItemsPage";

interface Props {
  selectedStockItem: StockItem;
}

const UpdateStockItemForm = ({ selectedStockItem }: Props) => {
  const { register, handleSubmit } = useForm<StockItem>();
  const { items } = useItemsPagination();

  const [errorStockItemUpdate, setErrorStockItemUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { setStockItems, stockItems } = useContext(StockItemContext);

  const onUpdate = (data: StockItem) => {
    const newly = {
      ...data,
      stock_item_invoice: selectedStockItem.id,
    };

    StockItemService.update(newly, `${selectedStockItem.id}`)
      .then((res) => {
        setSuccess(res.status === 200 ? "Updated Successfully" : "");
        console.log(res);

        setStockItems(
          stockItems.map((item) =>
            item.id === selectedStockItem.id ? res.data : item
          )
        );
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

            <Select
              {...register("item")}
              className="select p-2"
              required
              width="50%"
            >
              <option value={selectedStockItem.item}>
                {selectedStockItem.item}
              </option>
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
              type="text"
              placeholder="Retail Price"
              defaultValue={selectedStockItem.retail_price}
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Cost</FormLabel>
            <Input
              {...register("cost")}
              type="text"
              placeholder="Cost"
              defaultValue={selectedStockItem.cost}
              width="50%"
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <FormLabel whiteSpace="nowrap">Customer Price</FormLabel>
            <Input
              {...register("customer_price")}
              type="text"
              placeholder="Selling Price"
              defaultValue={selectedStockItem.customer_price}
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Discount</FormLabel>
            <Input
              {...register("supplier_discount")}
              type="text"
              placeholder="Discount"
              defaultValue={selectedStockItem.supplier_discount}
              width="50%"
            />
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <FormLabel>Qty</FormLabel>
            <Input
              {...register("qty")}
              type="text"
              placeholder="Qty"
              defaultValue={selectedStockItem.qty}
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
            Update
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UpdateStockItemForm;
