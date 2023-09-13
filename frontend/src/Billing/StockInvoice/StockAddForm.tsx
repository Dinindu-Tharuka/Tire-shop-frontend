import {
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import { IoAddCircle } from "react-icons/io5";
import StockInvoiceService, {
  StockInvoice,
} from "../../services/Stock/stock-invoice-page-service";
import StockInvoicePageContext from "../../Contexts/Stock/StockInvoicePageContext";
import useSupplier from "../../hooks/Registration/useSupplier";
import { StockItem } from "../../services/Stock/stock-item-service";
import useItems from "../../hooks/Inventory/useItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import {
  STOCK_ITEM_MARIGIN_BOTTOM,
  STOCK_ITEM_MARIGIN_LEFT,
  STOCK_ITEM_QTY_WIDTH,
  STOCK_ITEM_WIDTH,
  STOCK_ITEM_WIDTH_MAIN,
} from "./UI Constants/StockItemBillConstatnts";

const StockAddForm = () => {
  const { register, handleSubmit, control } = useForm<StockInvoice>({
    defaultValues: {},
  });

  const {
    fields: stockItemArray,
    append: stockItemAppend,
    remove: stockItemRemove,
  } = useFieldArray({
    name: "stockitems",
    control,
  });

  const [errorStockInvoiceCreate, setStockinvoiceCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { stockInvoices, setStockInvoices } = useContext(
    StockInvoicePageContext
  );
  const { items } = useItems();
  const { suppliers } = useSupplier();
  const { stockItems, setStockItems } = useContext(StockItemContext);

  const onSubmit = (data: StockInvoice) => {
    console.log(data.stockitems);

    StockInvoiceService.create(data)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setStockInvoices([res.data, ...stockInvoices]);
        setStockItems([...res.data.stockitems, ...stockItems]);
      })
      .catch((err) => setStockinvoiceCreate(err.message));
  };
  return (
    <>
      {errorStockInvoiceCreate && (
        <Text textColor="#dd0939">{errorStockInvoiceCreate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="w-50 d-flex flex-row">
            <div className="mb-3 me-3 h-75">
              <Input
              width={STOCK_ITEM_WIDTH_MAIN}
                {...register("invoice_no")}
                type="text"
                placeholder="Bill No"
              />
            </div>
            <div className="mb-3">
              <Select {...register("supplier")} width={STOCK_ITEM_WIDTH_MAIN} className="select p-2">
                <option>Select Supplier</option>
                {suppliers.map((sup, index) => (
                  <option className="mt-3" key={index} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Add Stock items */}
          <div className="mb-3">
            {stockItemArray.map((field, index) => (
              <Flex marginBottom={STOCK_ITEM_MARIGIN_BOTTOM}>
                <Flex>
                  <Select
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    {...register(`stockitems.${index}.item`)}
                    className="select w-100 p-2"
                  >
                    <option>Select Item</option>
                    {items.map((item, index) => (
                      <option className="mt-3" key={index} value={item.item_id}>
                        {item.item_id}
                      </option>
                    ))}
                  </Select>
                  <Input
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    type="number"
                    {...register(`stockitems.${index}.retail_price`)}
                    placeholder="Retail Price"
                  />
                </Flex>
                <Flex>
                  <Input
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    type="number"
                    {...register(`stockitems.${index}.cost`)}
                    placeholder="Cost"
                  />
                  <Input
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    type="number"
                    {...register(`stockitems.${index}.selling_price`)}
                    placeholder="Selling Price"
                  />
                </Flex>
                <Flex>
                  <Input
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    type="number"
                    {...register(`stockitems.${index}.discount`)}
                    placeholder="Discount"
                  />

                  <Input
                    width={STOCK_ITEM_QTY_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    type="number"
                    {...register(`stockitems.${index}.qty`)}
                    placeholder="QTY"
                  />
                  <Input
                    marginRight={STOCK_ITEM_MARIGIN_LEFT}
                    width={STOCK_ITEM_QTY_WIDTH}
                    type="number"
                    {...register(`stockitems.${index}.sold_qty`)}
                    placeholder="Sold QTY"
                  />
                </Flex>
                <Flex>
                  {index >= 0 && (
                    <Button
                      bg="#f87454"
                      padding={3}
                      type="button"
                      onClick={() => stockItemRemove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))}
            <Flex alignItems="center">
              <Button
                type="button"
                onClick={() => stockItemAppend({} as StockItem)}
              >
                Add Stock Item
              </Button>
              <IoAddCircle />
            </Flex>
          </div>

          <div className="w-50 d-flex ">
          <div className="mb-3 me-3">
            <Input
              {...register("total_discount")}
              type="number"
              placeholder="Total Discount"
            />
          </div>
            <div className="mb-3">
              <Input
                {...register("total_amount")}
                type="number"
                placeholder="Total Amount"
              />
            </div>
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setStockinvoiceCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default StockAddForm;
