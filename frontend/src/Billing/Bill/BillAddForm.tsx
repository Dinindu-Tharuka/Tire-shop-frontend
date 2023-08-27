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
import BillContext from "../../Contexts/Bill/BillContext";
import { IoAddCircle } from "react-icons/io5";
import BillServices, {
  Bill,
  BillItem,
  BillService,
} from "../../services/Billing/bill-service";
import ItemContext from "../../Contexts/Inventory/ItemContext";
import useItems from "../../hooks/Inventory/useItems";

const BillAddForm = () => {
  const { register, handleSubmit, control } = useForm<Bill>({
    defaultValues: {},
  });

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
  const { toggleColorMode, colorMode } = useColorMode();

  const { bills, setBills } = useContext(BillContext);
  const { items } = useItems();


  const onSubmit = (data: Bill) => {
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
          <div className="mb-3 h-75">
            <Input
              {...register("invoice_id")}
              type="text"
              placeholder="Bill No"
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("customer")}
              type="text"
              placeholder="Customer"
            />
          </div>

          {/* Add Items */}
          <div className="mb-3">
            {itemsArray.map((field, index) => (
              <Flex>
                <Flex>
                  
                  <Select
                    {...register(`bill_items.${index}.item`)}
                    className="select w-100 p-2"
                  >                   

                    {items.map((item, index) => (
                      <option key={index} value="2">
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    type="text"
                    {...register(`bill_items.${index}.stock_item`)}
                    placeholder="Stock Item"
                  />
                  {/* <Input
                    type="text"
                    {...register(`bill_items.${index}.bill`)}
                    placeholder="Bill"
                  /> */}
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
                      padding={3}
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
              <Button type="button" onClick={() => itemAppend({} as BillItem)}>
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
                  <Input
                    type="text"
                    {...register(`bill_services.${index}.service`)}
                    placeholder="Item"
                  />
                  <Input
                    type="text"
                    {...register(`bill_services.${index}.employee`)}
                    placeholder="Stock Item"
                  />
                  <Input
                    type="text"
                    {...register(`bill_services.${index}.bill`)}
                    placeholder="Bill"
                  />
                </Flex>

                <Flex>
                  {index > 0 && (
                    <Button
                      bg="#f87454"
                      padding={3}
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

          <div className="mb-3">
            <Input
              {...register("discount_amount")}
              type="number"
              placeholder="Discount Amount"
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("sub_total")}
              type="number"
              placeholder="Sub Total"
            />
          </div>
          <div className="mb-3">
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
