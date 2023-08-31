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
  PaymentCash,
  PaymentCheque,
  PaymentCredit,
  PaymentCreditCard,
} from "../../services/Billing/bill-service";
import useItems from "../../hooks/Inventory/useItems";
import useCustomer from "../../hooks/Customer/useCustomer";
import useStockItem from "../../hooks/Stock/useStockItems";
import { PADDING_UPDATE_DRAWER_BUTTON } from "../../Constants/Constants";
import useService from "../../hooks/Registration/useService";
import useEmployee from "../../hooks/Registration/useEmployee";
import PaymentCashInput from "./Payments/PaymentCashInput";
import PaymentChequeInput from "./Payments/PaymentChequeInput";
import PaymentCreditCardInput from "./Payments/PaymentCreditCardInput";
import PaymentCreditInput from "./Payments/PaymentCreditInput";

const BillAddForm = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const { register, handleSubmit, control } = useForm<Bill>();

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

  const {
    fields: paymentsArray,
    append: paymentAppend,
    remove: paymentRemove,
  } = useFieldArray({
    name: "bill_payments",
    control,
  });

  const [errorBillCreate, setErrorBillCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();
  const { customers } = useCustomer();
  const { stockItems } = useStockItem();
  const { services } = useService();
  const { employees } = useEmployee();

  const onSubmit = (data: Bill) => {
    console.log("form", data);

    BillServices.create(data)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfullt Created." : "");
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
              {...register("invoice_id")}
              type="text"
              placeholder="Bill No"
            />
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
                    onChange={(event)=>setSelectedItem(event.target.value)
                    }
                  >
                    <option value="">Select Item</option>
                    {items.map((item, index) => (
                      <option key={index} value={item.item_id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  <Select
                    {...register(`bill_items.${index}.stock_item`)}
                    className="select w-100 p-2"
                  >
                    <option value="">Select Stock Item</option>
                    {stockItems.filter((item)=> item.item === selectedItem).map((stockItem, index) => (
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
                  <Input
                    type="number"
                    {...register(`bill_items.${index}.qty`)}
                    placeholder="QTY"
                  />
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
                  {index > 0 && (
                    <Button
                      bg="#f87454"
                      padding={2.5}
                      type="button"
                      onClick={() => itemRemove(index)}
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

          {/* Add Payments */}
          <div className="mb-3">
            {paymentsArray.map((field, index) => (
              <Flex>
                <Flex>
                  <Input
                    {...register(`bill_payments.${index}.discount`)}
                    placeholder="Discount"
                    type="number"
                    className=""
                  />
{/* 
                  <Select
                    {...register(`bill_payments.${index}.payment_methods`)}
                    className="select p-2"
                    onChange={(event) =>
                      setselectedPaymentMethod(event.target.value)
                    }
                  >
                    <option>Payment Method</option>
                    {paymentMethods.map((method, index) => (
                      <option className="mt-3" key={index} value={method[1]}>
                        {method[0]}
                      </option>
                    ))}
                  </Select> */}
                </Flex>
                <VStack align="start">
                  
                    <HStack>
                      <PaymentCashInput
                        field={field}
                        control={control}
                        indexMain={index}
                        register={register}
                      />
                    </HStack>
                  
                  <HStack>
                    <PaymentChequeInput
                      field={field}
                      control={control}
                      indexMain={index}
                      register={register}
                    />
                  </HStack>
                  <HStack>
                    <PaymentCreditCardInput
                      field={field}
                      control={control}
                      indexMain={index}
                      register={register}
                    />
                  </HStack>
                  <HStack>
                    <PaymentCreditInput
                      field={field}
                      control={control}
                      indexMain={index}
                      register={register}
                    />
                  </HStack>
                </VStack>

                <Flex>
                  {index > 0 && (
                    <Button
                      bg="#f87454"
                      padding={2.5}
                      type="button"
                      onClick={() => paymentRemove(index)}
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
                onClick={() => {
                  paymentAppend({
                    ...({} as BillPayment),
                  } as BillPayment);
                }}
              >
                Add Payment
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
              {...register("sub_total")}
              type="number"
              placeholder="Sub Total"
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
        <HStack justifyContent="space-between">
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
        </HStack>
      </form>
    </>
  );
};

export default BillAddForm;
