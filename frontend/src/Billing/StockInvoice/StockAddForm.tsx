import {
  Button,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import useAllItems from "../../hooks/Inventory/useItems";
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
import { Supplier } from "../../services/Registration/supplier-service";
import SupplierFilter from "../../Registration/Supplier/SupplierFilter";
import StockInvoiceShowDrawer from "./StockInvoiceShowDrawer";
import { GenerateBillNumber } from "../../Common/GenerateBillNumbers";
import AllStockInvoiceContext from "../../Contexts/Stock/AllStockInvoiceContext";
import { AiOutlineDown } from "react-icons/ai";

const StockAddForm = () => {
  const [watchingCost, setWatchingCost] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [stockInvoice, setStockInvoice] = useState<StockInvoice>();

  // for filter items
  const [itemFilter, setItemFilter] = useState("");
  const [currentSelectedItems, setCurrentSelectedItems] = useState<string[]>(
    []
  );

  //for supplier menus
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>();
  const { register, handleSubmit, control, reset, watch, getValues, setValue } =
    useForm<StockInvoice>();

  const [isCreatedBill, setIsCreatedBill] = useState(false);

  const stocks = useWatch({ control, name: "stock_items" });
  const { setStockItemsUnique } = useContext(StockItemUniqueContext);

  //Supplier context
  const { suppliers, setFilterSupplierParams } = useContext(SupplierContext);

  const {
    fields: stockItemArray,
    append: stockItemAppend,
    remove: stockItemRemove,
  } = useFieldArray({
    name: "stock_items",
    control,
  });

  // set rangom grnnumber
  useEffect(() => {
    const randomGrnNumber = new GenerateBillNumber("GRN");
    // setGrnNo(randomGrnNumber.generate())
    setValue("invoice_no", randomGrnNumber.generate());
  }, [isCreatedBill]);

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
  const { colorMode } = useColorMode();
  const { stockInvoices, setStockInvoices } = useContext(
    StockInvoicePageContext
  );
  const { stockAllInvoices, setStockAllInvoices } = useContext(
    AllStockInvoiceContext
  );
  const { allItems } = useAllItems();
  const { stockItems, setStockItems } = useContext(StockItemContext);

  const onSubmit = (data: StockInvoice) => {
    const stockItemss = data.stock_items.map((item, index) =>
      item.retail_price + "" === ""
        ? { ...item, retail_price: "0" , item:currentSelectedItems[index]}
        : { ...item, item:currentSelectedItems[index] }
    );
    const newly = {
      ...data,
      supplier: selectedSupplier?.id,
      stock_items: [...stockItemss],
    };
    console.log(newly);

    StockInvoiceService.create(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setStockInvoice(res.data);
        setStockItems([...res.data.stock_items, ...stockItems]);
        setIsCreatedBill(true);
        setStockInvoices([res.data, ...stockInvoices]);
        setStockAllInvoices([...stockAllInvoices, res.data]);

        console.log(res.data);
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-column justify-content-between">
          <div className="w-50 d-flex flex-row">
            <div className="mb-3 me-3 h-75">
              <Input
                isDisabled={isCreatedBill}
                width={STOCK_ITEM_WIDTH}
                {...register("invoice_no")}
                type="text"
                placeholder="GRN No"
              />
            </div>
            <div className="mb-3 me-3 h-75">
              <Input
                isDisabled={isCreatedBill}
                width={STOCK_ITEM_WIDTH}
                {...register("bill_invoice_no")}
                type="text"
                placeholder="Invoice No"
              />
            </div>
            <div className="mb-3">
              <SupplierFilter
                selectedSupplier={(sup) => setSelectedSupplier(sup)}
              />
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
            {stockItemArray.map((field, rowIndex) => (
              <Flex marginBottom={STOCK_ITEM_MARIGIN_BOTTOM} flexDir="column">
                <Flex>               

                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<AiOutlineDown />}
                      isDisabled={isCreatedBill}
                      width={STOCK_ITEM_WIDTH}
                      marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    >
                      {currentSelectedItems[rowIndex]
                        ? currentSelectedItems[rowIndex]
                        : "Select Items"}
                    </MenuButton>
                    <MenuList>
                      <Input
                        type="text"
                        onKeyUp={(e) => setItemFilter(e.currentTarget.value)}
                      />
                      {allItems
                        .filter((item) => item.item_id.startsWith(itemFilter))
                        .map((item, index) => (
                          <MenuItem
                            onClick={() => {
                              let items = [...currentSelectedItems];
                              items[rowIndex] = item.item_id;
                              setCurrentSelectedItems([...items]);
                            }}
                          >
                            {item.item_id}
                          </MenuItem>
                        ))}
                    </MenuList>
                  </Menu>
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${rowIndex}.retail_price`)}
                    placeholder="Retail Price"
                    onChange={(e) =>
                      onChangeRetailPrice(e, rowIndex, watch, setValue)
                    }
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="nubmer"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${rowIndex}.supplier_discount`)}
                    placeholder="Supplier Discount"
                    onChange={(e) =>
                      onChangeSupplierDiscount(e, rowIndex, watch, setValue)
                    }
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${rowIndex}.customer_discount`)}
                    placeholder="Customer Discount"
                    onChange={(e) =>
                      onChangeCustomerPrice(e, rowIndex, watch, setValue)
                    }
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${rowIndex}.sales_discount`)}
                    placeholder="Sales Discount"
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0"
                    {...register(`stock_items.${rowIndex}.cost`)}
                    placeholder="Cost"
                    onChange={(e) => {
                      onchangeCostValue(e, rowIndex, watch, setValue);
                      setWatchingCost(e.currentTarget.value);
                    }}
                  />

                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    required
                    {...register(`stock_items.${rowIndex}.qty`)}
                    placeholder="QTY"
                  />
                  <Input
                    isDisabled={isCreatedBill}
                    width={STOCK_ITEM_WIDTH}
                    marginRight={STOCK_ITEM_MARIGIN_RIGHT}
                    type="number"
                    step="0.01"
                    defaultValue="0.00"
                    {...register(`stock_items.${rowIndex}.customer_price`)}
                    placeholder="Customer Price"
                  />
                </Flex>

                <Flex justifyContent="end" marginTop={2}>
                  {rowIndex >= 0 && (
                    <Button
                      isDisabled={isCreatedBill}
                      bg="#f87454"
                      padding={3}
                      type="button"
                      onClick={() => {
                        stockItemRemove(rowIndex);
                        reduceCostPriceIfDeleteStockItem(rowIndex);
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
                  setItemFilter('')
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
        <HStack justifyContent="space-between" width="30vw">
          <StockInvoiceSaveConfirmation
            onSubmit={submitForm}
            isDiabled={isCreatedBill}
          />
        </HStack>
      </form>
      <Flex marginTop={5}>
        <Button
          marginRight={5}
          type="button"
          width="10vw"
          bg={colorMode === "light" ? "#e3a99c" : "#575757"}
          onClick={() => {
            setStockinvoiceCreate("");
            setSuccess("");
            reset();
            setIsCreatedBill(false);
            stockItemArray.forEach((item, index) => stockItemRemove(index));

            // for filtering items
            setItemFilter('')
            setCurrentSelectedItems([])
          }}
        >
          Reset
        </Button>
        {stockInvoice !== undefined && isCreatedBill && (
          <StockInvoiceShowDrawer selectedStockInvoice={stockInvoice} />
        )}
      </Flex>
    </>
  );
};

export default StockAddForm;
