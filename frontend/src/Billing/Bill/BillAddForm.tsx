import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Select,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
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
import BillAddPayment from "../BillPayments/BillAddPayment";
import calculateSubTotal from "./BillCalculation";
import calculateStockitemCount from "../../componants/Inventory/Item/Calculations/CountStockItems";
import {
  BILL_ITEM_MARGIN_BOTTOM,
  BILL_ITEM_MARGIN_LEFT,
  BILL_ITEM_TEXT_PADDING,
  BILL_ITEM_WIDTH,
} from "./UI Contastants/BillFormConstatnts";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemText, setSelectedItemText] = useState<string[]>([]);
  const [createdBill, setCreatedBill] = useState<Bill>({} as Bill);
  const [isCreatedBill, setIsCreatedBill] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStockItems, setSelectedStockItem] = useState<string[]>([]);

  const { colorMode } = useColorMode();
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number[]>(
    []
  );
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
  } = useForm<Bill>();
  const [seletedItemCountList, setSeletedItemCountList] = useState<number[]>(
    []
  );

  const paymentMethods = [
    ["Cash", "cash"],
    ["Cheque", "cheque"],
    ["Credit Card", "credit_card"],
    ["Credit", "credit"],
    ["Multiple Option", "multiple"],
  ];

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

  const onSubmit = (data: Bill) => {
    const { total, discount } = calculateSubTotal(data, services);
    setDiscount(discount);
    setSubTotal(total);

    const newly = { ...data, sub_total: total, discount_amount: discount };
    console.log("new ", newly);

    BillServices.create<Bill>(newly)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setBills([res.data, ...bills]);
        setCreatedBill(res.data);
        setIsCreatedBill(true);
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
            {itemsArray.map((field, index) => (
              <Flex>
                <Flex>
                  {!selectedItemText[index] ? (
                    <Select
                      {...register(`bill_items.${index}.item`)}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      onChange={(event) => {
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
                          {item.item_id}
                          {"(" +
                            calculateStockitemCount(item, stockItems) +
                            ")"}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Text
                      padding={BILL_ITEM_TEXT_PADDING}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                      width={BILL_ITEM_WIDTH}
                      textAlign="left"
                    >
                      {selectedItemText[index]}
                    </Text>
                  )}
                  {!selectedStockItems[index] ? (
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
                      }}
                    >
                      <option>Stock Item</option>
                      {stockItems
                        .filter((item) => item.item === selectedItem)
                        .map((stockItem, index) => (
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
                        ))}
                    </Select>
                  ) : (
                    <Text
                      padding={BILL_ITEM_TEXT_PADDING}
                      marginRight={BILL_ITEM_MARGIN_LEFT}
                      width={BILL_ITEM_WIDTH}
                      textAlign="left"
                      marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    >
                      {selectedStockItems[index]}
                    </Text>
                  )}
                </Flex>
                <Flex>
                  <Flex flexDir="column">
                    <Input
                      type="number"
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
                      console.log("valuse", seletedItemCountList);

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
                    onChange={(e) =>
                      setSelectedServiceIndex([
                        ...selectedServiceIndex,
                        parseInt(e.target.value),
                      ])
                    }
                  >
                    <option>Select Service</option>
                    {services.map((service, index) => (
                      <option className="mt-3" key={index} value={service.id}>
                        {service.description}
                      </option>
                    ))}
                  </Select>

                  <Input
                    marginRight={BILL_ITEM_MARGIN_LEFT}
                    width={BILL_ITEM_WIDTH}
                    marginBottom={BILL_ITEM_MARGIN_BOTTOM}
                    value={
                      services.find(
                        (ser) => ser.id === selectedServiceIndex[index]
                      )?.service_value
                    }
                    placeholder="Price"
                  />

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
                  {index > 0 && (
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

          <div className="mb-3 w-25">
            <Input
              {...register("custome_item_value")}
              type="text"
              placeholder="Customer Item Value"
            />
          </div>
        </div>
        <TableContainer width="40vw">
          <Table>
            {discount !== 0 && (
              <Tr>
                <Th>Total Discount</Th>
                <Td>{discount}</Td>
              </Tr>
            )}
            {subTotal !== 0 && (
              <Tr>
                <Th>Sub Total</Th>
                <Td>{subTotal}</Td>
              </Tr>
            )}
          </Table>
        </TableContainer>

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
            type="submit"
            isDisabled={isCreatedBill}
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorBillCreate("");
              setSuccess("");
              window.location.reload();
            }}
          >
            Without Payments
          </Button>
        </HStack>
      </form>
      {isCreatedBill && <BillAddPayment createdBill={createdBill} />}
    </>
  );
};

export default BillAddForm;
