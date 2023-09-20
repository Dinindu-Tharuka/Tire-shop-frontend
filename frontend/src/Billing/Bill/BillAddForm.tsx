import {
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import BillContext from "../../Contexts/Bill/BillContext";
import { IoAddCircle } from "react-icons/io5";
import BillServices, {
  Bill,
  BillItem,
  BillService,
} from "../../services/Billing/bill-page-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import useEmployee from "../../hooks/Registration/useEmployee";
import useItems from "../../hooks/Inventory/useItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import calculateStockitemCount from "../../componants/Inventory/Item/Calculations/CountStockItems";
import {
  BILL_ITEM_MARGIN_BOTTOM,
  BILL_ITEM_MARGIN_LEFT,
  BILL_ITEM_WIDTH,
} from "./UI Contastants/BillFormConstatnts";
import stockItemService, {
  StockItem,
} from "../../services/Stock/stock-item-service";
import { BillNumberGenerate } from "./Calculations/BillNumberGenerator";
import {
  onChangeBillCustomItemValue,
  onChangeBillQty,
  onChangeService,
  onchangeBillStockItemUnique,
} from "./Calculations/BillCalculations";
import BillSaveConfirmation from "./BillSaveConfirmation";
import StockItemUniqueContext from "../../Contexts/Stock/StockItemUniqueContext";
import { StockItemUnique } from "../../services/Stock/stock-item-unique-service";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isCreatedBill, setIsCreatedBill] = useState(false);

  //
  const [seletedFilteredListSet, setSeletedFilteredListSet] = useState<
    StockItemUnique[][]
  >([[]]);
  const [rowIndex, setRowIndex] = useState(-1);

  const [selectedItemText, setSelectedItemText] = useState<string[]>([]);
  const [selectedStockItems, setSelectedStockItem] = useState<string[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");

  const { colorMode } = useColorMode();
  const [selectedServicesPrice, setSelectedServicesPrice] = useState<number[]>(
    []
  );
  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();

  const { customers } = useCustomer();
  const { services } = useService();
  const { employees } = useEmployee();
  const { stockItems, setStockItems } = useContext(StockItemContext);
  const { stockItemsUnique, setStockItemsUnique } = useContext(
    StockItemUniqueContext
  );

  console.log("uniques", stockItemsUnique);

  // setting up stock item unique
  const [selectedStockItemUnique, setSelectedStockitemUnique] = useState<
    StockItemUnique[]
  >([]);

  useEffect(() => {
    const { request, cancel } = stockItemService.getAll<StockItem>();

    request
      .then((res) => setStockItems([...res.data]))
      .catch((error) => {
        console.log(error.message);
      });

    return () => cancel();
  }, [isCreatedBill]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Bill>();

  const billItemsWatch = useWatch({
    control,
    name: "bill_items",
  });

  // calculate Sub Total

  useEffect(() => {
    let subTotal = 0;
    console.log(selectedServicesPrice);

    const serviceTotal = selectedServicesPrice.reduce(
      (currentValue, nextValue) => currentValue + parseInt(nextValue + ""),
      0
    );
    if (billItemsWatch) {
      const customerPrice = billItemsWatch.reduce(
        (currentValue, currentItem) =>
          currentValue + parseFloat(currentItem.customer_price + ""),
        0
      );
      subTotal = +(customerPrice + serviceTotal);
      setSubTotal(subTotal);
      setValue("sub_total", Math.round(subTotal * 100) / 100);
    }
  }, [billItemsWatch, selectedServicesPrice]);

  // To calculate valid qty in selected item unique
  const [seletedItemCountList, setSeletedItemCountList] = useState<number[]>(
    []
  );

  const {
    fields: itemsArray,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    name: "bill_items",
    control,
  });

  const {
    fields: serviceArray,
    append: serviceAppend,
    remove: serviceRemove,
  } = useFieldArray({
    name: "bill_services",
    control,
  });

  // find seleted stock item unique and store it in a array
  const findStockItemUnique = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    console.log(e.target.value);

    const findStockItemUnique = stockItemsUnique.find(
      (item) => item.id === parseInt(e.target.value)
    );
    const stocks = [...selectedStockItemUnique];
    if (findStockItemUnique !== undefined) {
      stocks[index] = findStockItemUnique;
      setValue(`bill_items.${index}.qty`, findStockItemUnique?.total_qty);
      setValue(
        `bill_items.${index}.customer_price`,
        findStockItemUnique.total_qty * findStockItemUnique.unit_price
      );
    }

    setSelectedStockitemUnique([...stocks]);
  };

  // Ui Item Fix
  useEffect(() => {
    // Get rid of zeros
    const options = stockItemsUnique.filter(
      (item) => item.item === selectedItem && item.total_qty !== 0
    );
    const newFilteredArray = [...seletedFilteredListSet];
    newFilteredArray[rowIndex] = options;
    setSeletedFilteredListSet([...newFilteredArray]);

    // Filter Same price and adding

    console.log("seleted", newFilteredArray[rowIndex]);
  }, [selectedItem, rowIndex, isCreatedBill]);

  const onSubmit = (data: Bill) => {
    console.log(data);

    const newly = { ...data, discount_amount: 0 };

    BillServices.create<Bill>(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setBills([res.data, ...bills]);
        setIsCreatedBill(true);
      })
      .catch((err) => setErrorBillCreate(err.message));
  };

  const submitForm = () => {
    setErrorBillCreate("");
    setSuccess("");
    // Programmatically trigger form submission
    handleSubmit(onSubmit)();
  };

  return (
    <>
      {errorBillCreate && <Text textColor="#dd0939">{errorBillCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}
      <form className="vh-75 ">
        <div className="d-flex flex-column justify-content-between">
          <Flex>
            <div className="mb-3 w-25 me-3">
              <Input
                isDisabled={isCreatedBill}
                {...register("invoice_id", {
                  required: "Bill number is required.",
                })}
                type="text"
                placeholder="Bill No"
                defaultValue={BillNumberGenerate()}
              />
              <Text textColor="red.600">{errors.invoice_id?.message}</Text>
            </div>

            <div className="mb-3 w-25">
              <Select isDisabled={isCreatedBill} {...register("customer")}>
                <option>Select Customer</option>
                {customers.map((customer, index) => (
                  <option className="mt-3" key={index} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </div>
          </Flex>

          {/* Add Items */}
          <div className="mb-3">
            <Flex>
              <Text
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
              >
                Select Item
              </Text>
              <Text
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
              >
                Select Stock Item
              </Text>
              <Text
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
              >
                QTY
              </Text>
              <Text
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
              >
                Customer Discount
              </Text>
              <Text
                marginRight={BILL_ITEM_MARGIN_LEFT}
                width={BILL_ITEM_WIDTH}
                marginBottom={BILL_ITEM_MARGIN_BOTTOM}
              >
                Customer Price
              </Text>
            </Flex>
            {itemsArray.map((field, index) => (
              <Flex key={index}>
                <Flex>
                  <Flex flexDir="column">
                    <Select
                      isDisabled={isCreatedBill}
                      {...register(`bill_items.${index}.item`)}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      onChange={(event) => {
                        setRowIndex(index);
                        setSelectedItem(event.target.value);
                        setSelectedItemText([
                          ...selectedItemText,
                          event.target.options[event.target.selectedIndex].text,
                        ]);
                      }}
                    >
                      <option value="">Select Item</option>
                      {items.map((item, index) => (
                        <option key={index} value={item.item_id}>
                          {item.item_id} (
                          {calculateStockitemCount(item, stockItems)})
                        </option>
                      ))}
                    </Select>
                  </Flex>

                  <Flex flexDir="column">
                    <Select
                      isDisabled={isCreatedBill}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      {...register(`bill_items.${index}.stock_item_unique`)}
                      onChange={(e) => {
                        // find seleted stock item unique and store it in a array

                        onchangeBillStockItemUnique(
                          e,
                          setValue,
                          stockItemsUnique,
                          stockItems,
                          index,
                          watch
                        );
                        const seletedCounts = [...seletedItemCountList];
                        const qtySelected = stockItemsUnique.find(
                          (item) => item.id === parseInt(e.currentTarget.value)
                        )?.total_qty;
                        if (qtySelected !== undefined) {
                          seletedCounts[index] = qtySelected;
                        }
                        setSeletedItemCountList([...seletedCounts]);
                      }}
                    >
                      <option>Stock Item</option>
                      {seletedFilteredListSet[index]?.map(
                        (stockItemUnique, index) => (
                          <option
                            key={index}
                            value={stockItemUnique.id}
                            className="w-100"
                          >
                            <div className="d-flex justify-content-between w-100 ">
                              <Text>
                                {stockItemUnique.item}(
                                {stockItemUnique.total_qty})
                              </Text>
                            </div>
                          </option>
                        )
                      )}
                    </Select>
                  </Flex>
                </Flex>
                <Flex>
                  <Flex flexDir="column">
                    <Input
                      isDisabled={isCreatedBill}
                      type="number"
                      required
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      {...register(`bill_items.${index}.qty`, {
                        validate: (fieldValue) => {
                          if (seletedItemCountList)
                            return (
                              fieldValue <= seletedItemCountList[index] ||
                              "Item counts not valid"
                            );
                        },
                      })}
                      onChange={(e) =>
                        onChangeBillQty(e, setValue, watch, index, stockItems)
                      }
                      placeholder="QTY"
                    />
                    <Text
                      textColor="red.600"
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    >
                      {errors.bill_items &&
                        errors.bill_items[index]?.qty?.message}
                    </Text>
                  </Flex>

                  <Flex>
                    <Input
                      isDisabled={isCreatedBill}
                      type="number"
                      step="0.01"
                      defaultValue={0}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      {...register(`bill_items.${index}.customer_discount`)}
                      placeholder="Customer Discount"
                    />
                  </Flex>

                  <Input
                    isDisabled={isCreatedBill}
                    marginRight={BILL_ITEM_MARGIN_LEFT}
                    width={BILL_ITEM_WIDTH}
                    marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    type="number"
                    step="0.01"
                    defaultValue={0}
                    {...register(`bill_items.${index}.customer_price`)}
                    placeholder="Customer Price"
                  />
                </Flex>

                <Flex>
                  <Button
                    isDisabled={isCreatedBill}
                    bg="#f87454"
                    padding={2.5}
                    type="button"
                    onClick={() => {
                      itemRemove(index);
                      setSeletedItemCountList(
                        seletedItemCountList.filter((val, ind) => index !== ind)
                      );
                      setSelectedStockItem([
                        ...selectedStockItems.filter(
                          (stockItem, indexStock) => indexStock !== index
                        ),
                      ]);

                      setSelectedItemText(
                        selectedItemText.filter(
                          (itemText, indexText) => indexText != index
                        )
                      );
                      setSeletedFilteredListSet([
                        ...seletedFilteredListSet.filter(
                          (list, listIndex) => listIndex !== index
                        ),
                      ]);
                    }}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            ))}

            <Flex alignItems="center">
              <Button
                isDisabled={isCreatedBill}
                type="button"
                onClick={() => {
                  itemAppend({} as BillItem);
                  // setSeletedItemCountList(seletedItemCountList);
                }}
              >
                Add Item
              </Button>
              <IoAddCircle />
            </Flex>
          </div>

          {/* Add Services */}
          <div className="mb-3">
            {serviceArray.map((field, index) => (
              <Flex>
                <Flex>
                  <Select
                    isDisabled={isCreatedBill}
                    {...register(`bill_services.${index}.service`)}
                    marginRight={BILL_ITEM_MARGIN_LEFT}
                    width={BILL_ITEM_WIDTH}
                    marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    onChange={(e) => {
                      onChangeService(
                        e,
                        setValue,
                        index,
                        services,
                        setSelectedServicesPrice,
                        selectedServicesPrice
                      );
                    }}
                  >
                    <option>Select Service</option>
                    {services.map((service, index) => (
                      <option className="mt-3" key={index} value={service.id}>
                        {service.description}
                      </option>
                    ))}
                  </Select>

                  <Text
                    marginRight={BILL_ITEM_MARGIN_LEFT}
                    width={BILL_ITEM_WIDTH}
                    marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    textAlign="center"
                    padding={2}
                  >
                    {selectedServicesPrice[index]
                      ? selectedServicesPrice[index]
                      : 0}
                  </Text>

                  <Select
                    isDisabled={isCreatedBill}
                    marginRight={BILL_ITEM_MARGIN_LEFT}
                    width={BILL_ITEM_WIDTH}
                    marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    {...register(`bill_services.${index}.employee`)}
                  >
                    <option>Select Employee</option>
                    {employees.map((employee, index) => (
                      <option className="mt-3" key={index} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex>
                  {index >= 0 && (
                    <Button
                      isDisabled={isCreatedBill}
                      bg="#f87454"
                      padding={2.5}
                      type="button"
                      onClick={() => serviceRemove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))}
            <Flex alignItems="center">
              <Button
                isDisabled={isCreatedBill}
                type="button"
                onClick={() => serviceAppend({} as BillService)}
              >
                Add Service
              </Button>
              <IoAddCircle />
            </Flex>
          </div>
          <Flex width="50vw">
            <Flex flexDir="column">
              <Text marginRight={BILL_ITEM_MARGIN_LEFT} width={BILL_ITEM_WIDTH}>
                Customer Item Value
              </Text>

              <div className="mb-3 w-25">
                <Input
                  isDisabled={isCreatedBill}
                  marginRight={BILL_ITEM_MARGIN_LEFT}
                  width={BILL_ITEM_WIDTH}
                  {...register("custome_item_value")}
                  defaultValue={0}
                  type="number"
                  step="0.01"
                  placeholder="Customer Item Value"
                  onChange={(e) =>
                    onChangeBillCustomItemValue(e, setValue, subTotal)
                  }
                />
              </div>
            </Flex>

            <Flex flexDir="column">
              <Text>Sub Total</Text>

              <div className="mb-3 w-100">
                <Input
                  isDisabled={isCreatedBill}
                  marginRight={BILL_ITEM_MARGIN_LEFT}
                  width={BILL_ITEM_WIDTH}
                  {...register("sub_total")}
                  defaultValue={0}
                  type="number"
                  step="0.01"
                />
              </div>
            </Flex>
          </Flex>
        </div>

        <HStack>
          <BillSaveConfirmation onSubmit={submitForm} />

          <Button
            width="10vw"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              reset();
              itemsArray.forEach((item, index) => itemRemove(index));
              serviceArray.forEach((service, index) => serviceRemove(index));
              setIsCreatedBill(false);
            }}
          >
            Reset
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default BillAddForm;
