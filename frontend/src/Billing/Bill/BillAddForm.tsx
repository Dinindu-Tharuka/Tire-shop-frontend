import {
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import BillPageContext from "../../Contexts/Bill/BillContext";
import { IoAddCircle } from "react-icons/io5";
import BillServices, {
  Bill,
  BillItem,
  BillService,
  DagPayment,
} from "../../services/Billing/bill-page-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import useEmployee from "../../hooks/Registration/useEmployee";
import useAllItems from "../../hooks/Inventory/useItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import calculateStockitemCount from "../../Inventory/Item/Calculations/CountStockItems";
import {
  BILL_ITEM_MARGIN_BOTTOM,
  BILL_ITEM_MARGIN_LEFT,
  BILL_ITEM_WIDTH,
} from "./UI Contastants/BillFormConstatnts";
import stockItemService, {
  StockItem,
  StockItemDefault,
} from "../../services/Stock/stock-item-service";
import { BillNumberGenerate } from "./Calculations/BillNumberGenerator";
import {
  onChangeBillCustomItemValue,
  onChangeBillQty,
  onChangeCustomerPrice,
  onChangeDagTyreChange,
  onChangeService,
  onchangeBillStockItemUnique,
} from "./Calculations/BillOnChangeCalculations";
import BillSaveConfirmation from "./BillSaveConfirmation";
import StockItemUniqueContext from "../../Contexts/Stock/StockItemUniqueContext";
import stockItemUniqueService, {
  StockItemUnique,
} from "../../services/Stock/stock-item-unique-service";
import BillShowDrawer from "./BillShow/BillShowDrawer";
import AllReceivedSupplierTyresContext from "../../Contexts/Rebuild/Received/AllReceivedSupplierTyre";
import AllSendSupplierTyresContext from "../../Contexts/Rebuild/AllSendSupplierContext";
import AllDagPaymentContext from "../../Contexts/Bill/AllDagPaymentContext";
import useVehicles from "../../hooks/Customer/useVehicles";
import VehicleContext from "../../Contexts/Customer/VehicleContext";
import AllCustomerContext from "../../Contexts/Customer/AllCustomerContext";

export interface ReceiveTyreNew {
  id: number;
  cost: number;
  status: string;
  send_supplier_tyre: string;
  job_no: string | undefined;
}

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");

  // After creation
  const [isCreatedBill, setIsCreatedBill] = useState(false);
  const [bill, setBill] = useState<Bill>();

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

  // Forfiltering vehicles
  const [selectedCustomer, setselectedCustomer] = useState("0");

  // filtering for dag payment section
  const [filteredSupplierTyres, setFilteredSupplierTyres] = useState<
    ReceiveTyreNew[]
  >([]);

  const { colorMode } = useColorMode();
  const [selectedServicesPrice, setSelectedServicesPrice] = useState<number[]>(
    []
  );
  const { bills, setBills } = useContext(BillPageContext);
  const { allItems } = useAllItems();
  const { allCustomers } = useContext(AllCustomerContext);
  const { vehicles } = useContext(VehicleContext);
  const { services } = useService();
  const { employees } = useEmployee();
  const { stockItems, setStockItems } = useContext(StockItemContext);
  const { stockItemsUnique, setStockItemsUnique } = useContext(
    StockItemUniqueContext
  );
  const { allReceivedSupplierTyres } = useContext(
    AllReceivedSupplierTyresContext
  );
  const { allSendSupplierTyres } = useContext(AllSendSupplierTyresContext);
  const { allDagPayments, setAllDagPayments } =
    useContext(AllDagPaymentContext);

  // To calculate valid qty in selected item unique
  const [seletedItemCountList, setSeletedItemCountList] = useState<number[]>(
    []
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Bill>({
    defaultValues: {
      bill_items: [],
      bill_services: [],
      dag_payments: [],
    },
  });

  const billItemsWatch = useWatch({
    control,
    name: "bill_items",
  });
  const dagPaymentsWatch = useWatch({
    control,
    name: "dag_payments",
  });

  // fieldArrays

  let {
    fields: itemsArray,
    append: itemAppend,
    remove: itemRemove,
  } = useFieldArray({
    name: "bill_items",
    control,
  });

  let {
    fields: serviceArray,
    append: serviceAppend,
    remove: serviceRemove,
  } = useFieldArray({
    name: "bill_services",
    control,
  });

  let {
    fields: dagPayments,
    append: dagPaymentAdd,
    remove: dagPaymentRemove,
  } = useFieldArray({
    name: "dag_payments",
    control,
  });

  useEffect(() => {
    const { request, cancel } = stockItemService.getAll<StockItemDefault>();

    request
      .then((res) => setStockItems([...res.data]))
      .catch((error) => {
        console.log(error.message);
      });

    const { request: stockItemUniqueRequest } =
      stockItemUniqueService.getAll<StockItemUnique>();

    stockItemUniqueRequest
      .then((res) => setStockItemsUnique([...res.data]))
      .catch((err) => console.log(err.message));

    return () => cancel();
  }, [isCreatedBill]);

  // filtering supplier tyres
  useEffect(() => {
    const newly = allReceivedSupplierTyres.map((tyre) => {
      return {
        ...tyre,
        job_no: allSendSupplierTyres.find(
          (sendTyre) => sendTyre.id === parseInt(tyre.send_supplier_tyre)
        )?.job_no,
      };
    });
    const filtered = newly.filter((tyre) => {
      const isAvailable = allDagPayments.some(
        (pay) => pay.received_supplier_tyre === tyre.id
      );

      return !isAvailable;
    });

    setFilteredSupplierTyres([...filtered]);
  }, []);

  // calculate Sub Total
  useEffect(() => {
    let subTotal = 0;

    const serviceTotal = selectedServicesPrice.reduce(
      (currentValue, nextValue) => currentValue + parseInt(nextValue + ""),
      0
    );
    if (dagPaymentsWatch || billItemsWatch) {
      const customerPrice = billItemsWatch?.reduce(
        (currentValue, currentItem) =>
          currentValue + parseFloat(currentItem.customer_price + ""),
        0
      );
      // console.log('billItemsWatch',billItemsWatch)
      const dagPayment = dagPaymentsWatch?.reduce(
        (currentValue, currentItem) =>
          currentValue + parseFloat(currentItem.customer_price + ""),
        0
      );

      // console.log('customerPrice', customerPrice)
      subTotal = +(customerPrice + serviceTotal + dagPayment);
      setSubTotal(subTotal);
      setValue("sub_total", Math.round(subTotal * 100) / 100);
    }
  }, [billItemsWatch, selectedServicesPrice, dagPaymentsWatch]);

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
  }, [selectedItem, rowIndex, isCreatedBill]);

  const onSubmit = (data: Bill) => {
    console.log(data, "bill");

    const total_discount = data.bill_items.reduce(
      (currentValue, item) =>
        currentValue + parseFloat(item.customer_discount + ""),
      0
    );

    const newly = { ...data, discount_amount: total_discount };

    BillServices.create<Bill>(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setBills([res.data, ...bills]);
        setIsCreatedBill(true);
        setBill(res.data);
        setAllDagPayments([...allDagPayments, ...res.data.dag_payments]);
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

            <div className="mb-3 w-25 me-3">
              <Select
                isDisabled={isCreatedBill}
                {...register("customer")}
                onChange={(e) => setselectedCustomer(e.currentTarget.value)}
              >
                <option>Select Customer</option>
                {allCustomers.map((customer, index) => (
                  <option className="mt-3" key={index} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-3 w-25">
              <Select isDisabled={isCreatedBill} {...register("vehicle")}>
                <option>Select Vehicle</option>
                {vehicles
                  .filter((veh) => veh.customer === parseInt(selectedCustomer))
                  .map((vehicle, index) => (
                    <option
                      className="mt-3"
                      key={index}
                      value={vehicle.vehical_no}
                    >
                      {vehicle.vehical_no}
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
                      {allItems.map((item, index) => (
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
                      defaultValue={0}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      {...register(`bill_items.${index}.customer_discount`)}
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

          {/* Add Dag Payments */}
          <div className="mb-3">
            {dagPayments.map((field, index) => {
              return (
                <Flex>
                  <Flex>
                    <Select
                      isDisabled={isCreatedBill}
                      {...register(
                        `dag_payments.${index}.received_supplier_tyre`
                      )}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      onChange={(e) =>
                        onChangeDagTyreChange(
                          e,
                          setValue,
                          subTotal,
                          index,
                          filteredSupplierTyres
                        )
                      }
                    >
                      <option>Received Tyre</option>
                      {filteredSupplierTyres.map((tyre, index) => (
                        <option className="mt-3" key={index} value={tyre.id}>
                          {tyre.job_no}
                        </option>
                      ))}
                    </Select>

                    <Input
                      isDisabled={isCreatedBill}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      type="number"
                      step="0.01"
                      placeholder="Cost"
                      {...register(`dag_payments.${index}.cost`)}
                    />
                    <Input
                      isDisabled={isCreatedBill}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      placeholder="Customer Price"
                      type="number"
                      defaultValue={0}
                      step="0.01"
                      {...register(`dag_payments.${index}.customer_price`)}
                      // onChange={e => onChangeCustomerPrice(e, setValue, subTotal)}
                    />
                  </Flex>

                  <Flex>
                    {index >= 0 && (
                      <Button
                        isDisabled={isCreatedBill}
                        bg="#f87454"
                        padding={2.5}
                        type="button"
                        onClick={() => {
                          // setSelectedIndex(-1)
                          dagPaymentRemove(index);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Flex>
                </Flex>
              );
            })}
            <Flex alignItems="center">
              <Button
                isDisabled={isCreatedBill}
                type="button"
                onClick={() => dagPaymentAdd({} as DagPayment)}
              >
                Add Dag
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
              itemsArray.forEach((item, index) => itemRemove(index));
              serviceArray.forEach((service, index) => serviceRemove(index));
              reset();

              setIsCreatedBill(false);
              setSuccess("");
              setErrorBillCreate("");
            }}
          >
            Reset
          </Button>

          {bill !== undefined && bill && <BillShowDrawer selectedBill={bill} />}
        </HStack>
      </form>
    </>
  );
};

export default BillAddForm;
