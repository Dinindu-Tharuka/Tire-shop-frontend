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
} from "../../services/Stock/stock-invoice-service";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import useItems from "../../hooks/Inventory/useItems";
import useSupplier from "../../hooks/Registration/useSupplier";
import { StockItem } from "../../services/Stock/stock-item-service";

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

  const { stockInvoices, setStockInvoices } = useContext(StockInvoiceContext);
  const { items } = useItems();
  const { suppliers } = useSupplier();

  const onSubmit = (data: StockInvoice) => {

    console.log(data);
    
    StockInvoiceService.create(data)
      .then((res) => {
        setSuccess(res.status === 201 ? "Successfully Created." : "");
        setStockInvoices([res.data, ...stockInvoices]);
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
          <div className="w-25">
            <div className="mb-3 h-75">
              <Input
                {...register("invoice_no")}
                type="text"
                placeholder="Bill No"
              />
            </div>
            <div className="mb-3">
              <Select {...register("supplier")} className="select p-2">
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
              <Flex>
                <Flex>
                  <Select
                    {...register(`stockitems.${index}.item`)}
                    className="select w-100 p-2"
                  >
                    <option>Select Item</option>
                    {items.map((item, index) => (
                      <option className="mt-3" key={index} value={item.item_id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                  <Input
                    type="number"
                    {...register(`stockitems.${index}.retail_price`)}
                    placeholder="Retail Price"
                  />
                </Flex>
                <Flex>
                  

                  <Input
                    type="number"
                    {...register(`stockitems.${index}.cost`)}
                    placeholder="Cost"
                  />
                  <Input
                    type="number"
                    {...register(`stockitems.${index}.selling_price`)}
                    placeholder="Selling Price"
                  />
                </Flex>
                <Flex>
                  <Input
                    type="number"
                    {...register(`stockitems.${index}.discount`)}
                    placeholder="Discount"
                  />
                 
                  <Input
                  
                    type="number"
                    {...register(`stockitems.${index}.qty`)}
                    placeholder="QTY"
                  />
                  <Input
                    type="number"
                    {...register(`stockitems.${index}.sold_qty`)}
                    placeholder="Sold QTY"
                  />
                </Flex>
                <Flex>
                  {index > 0 && (
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



          <div className="w-25">
          <div className="mb-3">
              <Input
                {...register("total_amount")}
                type="number"
                placeholder="Total Amount"
              />
            </div>

            <div className="mb-3">
              <Input
                {...register("total_discount")}
                type="number"
                placeholder="Total Discount"
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
