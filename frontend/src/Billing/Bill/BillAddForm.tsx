import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Select,
  Text,
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
  BillPayment,
  BillService,
} from "../../services/Billing/bill-service";
import useCustomer from "../../hooks/Customer/useCustomer";
import useService from "../../hooks/Registration/useService";
import useEmployee from "../../hooks/Registration/useEmployee";
import PaymentCashInput from "./Payments/PaymentCashInput";
import PaymentChequeInput from "./Payments/PaymentChequeInput";
import PaymentCreditCardInput from "./Payments/PaymentCreditCardInput";
import PaymentCreditInput from "./Payments/PaymentCreditInput";
import useItems from "../../hooks/Inventory/useItems";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import BillAddPayment from "./BillAddPayment";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");

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

 

  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");
  const [isComletedBill, setIsComletedBill] = useState(false)
  const { toggleColorMode, colorMode } = useColorMode();

  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();

  const { customers } = useCustomer();
  const { services } = useService();
  const { employees } = useEmployee();
  const { stockItems, setStockItems } = useContext(StockItemContext);

  const onSubmit = (data: Bill) => {
    console.log(data);

    BillServices.create<Bill>(data)
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

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 w-25">
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
            <Select {...register("customer")} className="select p-2">
              <option>Select Customer</option>
              {customers.map((customer, index) => (
                <option className="mt-3" key={index} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Add Items */}
          <div className="mb-3">
            {itemsArray.map((field, index) => (
              <Flex>
                <Flex>
                  <Select
                    {...register(`bill_items.${index}.item`)}
                    className="select w-100 p-2"
                    marginRight={10}
                    onChange={(event) => {
                      setSelectedItem(event.target.value);
                    }}
                  >
                    <option value="">Select Item</option>
                    {items.map((item, index) => (
                      <option key={index} value={item.item_id}>
                        {item.item_id}
                      </option>
                    ))}
                  </Select>
                  <Select
                    width="30vw"
                    {...register(`bill_items.${index}.stock_item`)}
                    className="select w-100 p-2"
                    onChange={(e) => {
                      const count = stockItems.find(
                        (item) => item.id === parseInt(e.target.value)
                      )?.qty;
                      if (count)
                        setSeletedItemCountList([
                          ...seletedItemCountList,
                          count,
                        ]);
                      console.log(seletedItemCountList);
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
                            <Text>{stockItem.item}</Text>
                            <Text>({stockItem.qty})</Text>
                          </div>
                        </option>
                      ))}
                  </Select>
                </Flex>
                <Flex>
                  <Flex flexDir="column" width="40vw">
                    <Input
                      type="number"
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
                    <Text textColor="red.600">
                      {errors.bill_items &&
                        errors.bill_items[index]?.qty?.message}
                    </Text>
                  </Flex>

                  <Input
                    type="number"
                    {...register(`bill_items.${index}.customer_discount`)}
                    placeholder="Customer Discount"
                  />
                  <Input
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
                      console.log("index", index);
                      setSeletedItemCountList(
                        seletedItemCountList.filter((val, ind) => index !== ind)
                      );

                      console.log("value updated", seletedItemCountList);
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
                  console.log(seletedItemCountList);
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
                    className="select p-2"
                  >
                    <option>Select Service</option>
                    {services.map((service, index) => (
                      <option className="mt-3" key={index} value={service.id}>
                        {service.description}
                      </option>
                    ))}
                  </Select>

                  <Select
                    {...register(`bill_services.${index}.employee`)}
                    className="select p-2"
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
              {...register("discount_amount")}
              type="number"
              placeholder="Discount Amount"
            />
          </div>
          <div className="mb-3 w-25">
            <Input
              {...register("custome_item_value")}
              type="text"
              placeholder="Customer Item Value"
            />
          </div>
        </div>
        <div className="mb-3 w-25">
          <Input
            {...register("sub_total")}
            type="number"
            placeholder="Sub Total"
          />
        </div>
        <HStack >
          <Button
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
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorBillCreate("");
              setSuccess("");
              
            }}
          >
            Payments
          </Button>
        </HStack>
      <BillAddPayment/>
      </form>
    </>
  );
};

export default BillAddForm;
