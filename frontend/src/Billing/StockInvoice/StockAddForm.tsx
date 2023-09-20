import {
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FieldValues, useForm, useFieldArray, useWatch } from "react-hook-form";
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
  STOCK_ITEM_MARIGIN_RIGHT,
  STOCK_ITEM_QTY_WIDTH,
  STOCK_ITEM_WIDTH,
  STOCK_WIDTH_NORMAL,
} from "./UI Constants/StockItemBillConstatnts";
import {
  onChangeCustomerPrice,
  onChangeRetailPrice,
  onChangeStockItemDiscount,
  onChangeSupplierDiscount,
  onchangeCostValue,
} from "./UI Calculations/StockInvoiceUICalculations";
import StockItemUniqueContext from "../../Contexts/Stock/StockItemUniqueContext";
import axiosInstance from "../../services/api-client";
import StockInvoiceSaveConfirmation from "./StockInvoiceSaveConfirmation";
import SupplierContext from "../../Contexts/Registration/SupplierContext";

const StockAddForm = () => {
  const [watchingCost, setWatchingCost] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const { register, handleSubmit, control, reset, watch, getValues, setValue } =
    useForm<StockInvoice>();

  const [isCreatedBill, setIsCreatedBill] = useState(false);

  const stocks = useWatch({ control, name: "stock_items" });
  const { setStockItemsUnique } = useContext(StockItemUniqueContext);

  //Supplier context
  const { suppliers, setFilterSupplierParams } = useContext(SupplierContext)

  console.log('suppliers', suppliers);
  
  const {
    fields: stockItemArray,
    append: stockItemAppend,
    remove: stockItemRemove,
  } = useFieldArray({
    name: "stock_items",
    control,
  });

  //Refetch stock item uniques
  useEffect(() => {
    axiosInstance
      .get("/stock-item-unique-list/")
      .then((res) => setStockItemsUnique([...res.data]))
      .catch((err) => console.log(err.message));
  }, [isCreatedBill]);

  useEffect(() => {
    let totalCost = 0;
    if (stocks !== undefined) {
      totalCost = stocks.reduce(
        (accum, current) => accum + parseInt(current.cost + ""),
        0
      );
    }

    const totalAmount = totalCost + parseFloat(watchingCost);
    setTotalAmount(totalAmount);
    setValue("total_amount", totalAmount);
  }, [stocks, setValue, watchingCost]);

  const reduceCostPriceIfDeleteStockItem = (index: number) => {
    stocks.splice(index, 1);

    setValue("stock_items", [...stocks]);
  };

  const [errorStockInvoiceCreate, setStockinvoiceCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();
  const { stockInvoices, setStockInvoices } = useContext(
    StockInvoicePageContext
  );
  const { items } = useItems();
  const { stockItems, setStockItems } = useContext(StockItemContext);

  const onSubmit = (data: StockInvoice) => {
    const stockItemss = data.stock_items.map((item) =>
      item.retail_price + "" === ""
        ? { ...item, retail_price: "0" }
        : { ...item }
    );
    const newly = { ...data, stock_items: [...stockItemss] };
    console.log(newly);

    StockInvoiceService.create(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setStockInvoices([res.data, ...stockInvoices]);
        setStockItems([...res.data.stock_items, ...stockItems]);
        setIsCreatedBill(true);
      })
      .catch((err) => setStockinvoiceCreate(err.message));
  };

  const submitForm = () => {
    setStockinvoiceCreate("");
    setSuccess("");
    handleSubmit(onSubmit)();
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
                isDisabled={isCreatedBill}
                width={STOCK_ITEM_WIDTH}
                {...register("invoice_no")}
                type="text"
                placeholder="Bill No"
              />
            </div>
            <div className="mb-3">
              <Select
                isDisabled={isCreatedBill}
                {...register("supplier")}
                width={STOCK_ITEM_WIDTH}
                className="select p-2"
              >
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
            <Flex>
              <Text width={STOCK_ITEM_WIDTH}></Text>
              <Text width={STOCK_ITEM_WIDTH}>Retail Price</Text>
              <Text width={STOCK_ITEM_WIDTH}>Supplier Discount</Text>
              <Text width={STOCK_ITEM_WIDTH}>Customer Discount</Text>
              <Text width={STOCK_ITEM_WIDTH}>Sales Discount</Text>
              <Text width={STOCK_ITEM_WIDTH}>Cost</Text>
              <Text width={STOCK_ITEM_WIDTH}>QTY</Text>
              <Text width={STOCK_ITEM_WIDTH}>Customer Price</Text>
            </Flex>
            {stockItemArray.map((field, index) => (
              <Flex marginBottom={STOCK_ITEM_MARIGIN_BOTTOM} flexDir="column">
                <Flex>
                  <Select
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    {...register(`stock_items.${index}.item`)}
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
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${index}.retail_price`)}
                    placeholder="Retail Price"
                    onChange={(e) =>
                      onChangeRetailPrice(e, index, watch, setValue)
                    }
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="nubmer"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${index}.supplier_discount`)}
                    placeholder="Supplier Discount"
                    onChange={(e) =>
                      onChangeSupplierDiscount(e, index, watch, setValue)
                    }
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${index}.customer_discount`)}
                    placeholder="Customer Discount"
                    onChange={(e) =>
                      onChangeCustomerPrice(e, index, watch, setValue)
                    }
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${index}.sales_discount`)}
                    placeholder="Sales Discount"
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${index}.cost`)}
                    placeholder="Cost"
                    onChange={(e) => {
                      onchangeCostValue(e, index, watch, setValue);
                      setWatchingCost(e.currentTarget.value);
                    }}
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    required
                    {...register(`stock_items.${index}.qty`)}
                    placeholder="QTY"
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0.00"
                    {...register(`stock_items.${index}.customer_price`)}
                    placeholder="Customer Price"
                  />
                </Flex>

                <Flex justifyContent="end" marginTop={2}>
                  {index >= 0 && (
                    <Button
                      isDisabled={isCreatedBill}
                      bg="#f87454"
                      padding={3}
                      type="button"
                      onClick={() => {
                        stockItemRemove(index);
                        reduceCostPriceIfDeleteStockItem(index);
                      }}
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
                isDisabled={isCreatedBill}
                onClick={() => {
                  setWatchingCost(0 + "");
                  stockItemAppend({} as StockItem);
                }}
              >
                Add Stock Item
              </Button>
              <IoAddCircle />
            </Flex>
          </div>
          <div className="w-50 d-flex ">
            <div className="mb-1 me-3 ">
              <Text width={STOCK_WIDTH_NORMAL}>Total Discount (%)</Text>
            </div>
            <div className="mb-1 me-3">
              <Text>Total Amount</Text>
            </div>
          </div>

          <div className="w-50 d-flex ">
            <div className="mb-3 me-3 ">
              <Input
                isDisabled={isCreatedBill}
                width={STOCK_WIDTH_NORMAL}
                {...register("total_discount")}
                type="number"
                step="0.01"
                defaultValue="0"
                placeholder="Total Discount"
                required
                onChange={(e) =>
                  onChangeStockItemDiscount(e, watch, setValue, totalAmount)
                }
              />
            </div>
            <div className="mb-3">
              <Input
                isDisabled={isCreatedBill}
                {...register("total_amount")}
                type="number"
                step="0.01"
                defaultValue="0.00"
                placeholder="Total Amount"
              />
            </div>
          </div>
        </div>
        <HStack justifyContent="space-between" width="10vw">
          <StockInvoiceSaveConfirmation onSubmit={submitForm} />
          <Flex>
            <Button
              type="button"
              bg={colorMode === "light" ? "#e3a99c" : "#575757"}
              onClick={() => {
                setStockinvoiceCreate("");
                setSuccess("");
                reset();
                setIsCreatedBill(false);
                stockItemArray.forEach((item, index) => stockItemRemove(index));
              }}
            >
              Reset
            </Button>
          </Flex>
        </HStack>
      </form>
    </>
  );
};

export default StockAddForm;
