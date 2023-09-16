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
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
import calculateSubTotal from "./BillCalculation";
import calculateStockitemCount from "../../componants/Inventory/Item/Calculations/CountStockItems";
import {
  BILL_ITEM_MARGIN_BOTTOM,
  BILL_ITEM_MARGIN_LEFT,
  BILL_ITEM_WIDTH,
} from "./UI Contastants/BillFormConstatnts";
import { StockItem } from "../../services/Stock/stock-item-service";
import { BillNumberGenerate } from "./Calculations/BillNumberGenerator";
import {
  onChangeBillCustomItemValue,
  onChangeBillQty,
  onChangeService,
  onchangeBillStockItem,
} from "./Calculations/BillCalculations";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");

  //
  const [seletedFilteredListSet, setSeletedFilteredListSet] = useState<
    StockItem[][]
  >([[]]);
  const [rowIndex, setRowIndex] = useState(-1);

  const [selectedItemText, setSelectedItemText] = useState<string[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStockItems, setSelectedStockItem] = useState<string[]>([]);

  const { colorMode } = useColorMode();
  const [selectedServicesPrice, setSelectedServicesPrice] = useState<number[]>([]);
  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();

  const { customers } = useCustomer();
  const { services } = useService();
  const { employees } = useEmployee();
  const { stockItems } = useContext(StockItemContext);

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
    
    const serviceTotal = selectedServicesPrice.reduce((currentValue, nextValue)=>currentValue+parseInt(nextValue+''),0)
    if (billItemsWatch){
      const customerPrice = billItemsWatch.reduce(
        (currentValue, currentItem) => currentValue + parseInt(currentItem.customer_price+''),
        0
      );     
      subTotal =+ (customerPrice + serviceTotal);  
      setSubTotal(subTotal)  
      setValue('sub_total', Math.round(subTotal * 100)/100)

    }
  }, [billItemsWatch, selectedServicesPrice ]);

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

  // Ui Item Fix
  useEffect(() => {
    const options = stockItems.filter(
      (item) => item.item === selectedItem && item.qty !== 0
    );
    const newFilteredArray = [...seletedFilteredListSet];
    newFilteredArray[rowIndex] = options;
    setSeletedFilteredListSet([...newFilteredArray]);
  }, [selectedItem, rowIndex]);

  const onSubmit = (data: Bill) => {
    console.log(data);    

    const newly = { ...data, discount_amount: 0 };
    console.log("new ", newly);

    BillServices.create<Bill>(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setBills([res.data, ...bills]);
      })
      .catch((err) => setErrorBillCreate(err.message));
  };
  return (
    <>
      {errorBillCreate && <Text textColor="#dd0939">{errorBillCreate}</Text>}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-75 ">
        <div className="d-flex flex-column justify-content-between">
          <Flex>
            <div className="mb-3 w-25 me-3">
              <Input
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
              <Select {...register("customer")}>
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
              <Flex>
                <Flex>
                  <Flex flexDir="column">
                    <Select
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
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      {...register(`bill_items.${index}.stock_item`)}
                      onChange={(e) => {
                        const count = stockItems.find(
                          (item) => item.id === parseInt(e.target.value)
                        )?.qty;
                        if (count)
                          setSeletedItemCountList([
                            ...seletedItemCountList,
                            count,
                          ]);

                        setSelectedStockItem([
                          ...selectedStockItems,
                          e.target.options[e.target.selectedIndex].text,
                        ]);

                        onchangeBillStockItem(e, setValue, stockItems, index);
                      }}
                    >
                      <option>Stock Item</option>
                      {seletedFilteredListSet[index]?.map(
                        (stockItem, index) => (
                          <option
                            key={index}
                            value={stockItem.id}
                            className="w-100"
                          >
                            <div className="d-flex justify-content-between w-100 ">
                              <Text>
                                {stockItem.item}({stockItem.qty})
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
                      type="number"
                      defaultValue={0}
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
                        onChangeBillQty(e, setValue, watch, index)
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
                type="button"
                onClick={() => {
                  itemAppend({} as BillItem);
                  setSeletedItemCountList(seletedItemCountList);
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
                    {selectedServicesPrice[index] ? selectedServicesPrice[index] : 0}
                  </Text>

                  <Select
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
                  marginRight={BILL_ITEM_MARGIN_LEFT}
                  width={BILL_ITEM_WIDTH}
                  {...register("custome_item_value")}
                  defaultValue={0}
                  type="number"
                  step="0.01"
                  placeholder="Customer Item Value"
                  onChange={(e)=> onChangeBillCustomItemValue(e, setValue, subTotal)}
                />
              </div>
            </Flex>

            <Flex flexDir="column">
              <Text>Sub Total</Text>

              <div className="mb-3 w-100">
                <Input
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
          <Button
            width="10vw"
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorBillCreate("");
              setSuccess("");
            }}
          >
            Save
          </Button>

          <Button
            width="10vw"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              reset();
              itemsArray.forEach((item, index) => itemRemove(index));
              serviceArray.forEach((service, index) => serviceRemove(index));
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
