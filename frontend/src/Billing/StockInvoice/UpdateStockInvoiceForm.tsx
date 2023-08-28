import {
  Button,
  Flex,
  HStack,
  Input,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { IoAddCircle } from "react-icons/io5";
import StockInvoiceService, {
  StockInvoice
} from "../../services/Stock/stock-invoice-service";
import StockInvoiceContext from "../../Contexts/Stock/StockInvoiceContext";
import useItems from "../../hooks/Inventory/useItems";
import useSupplier from "../../hooks/Registration/useSupplier";
import StockItemContext from "../../Contexts/Stock/StockItemContext";
import StockItemDelete from "../StockItem/StockItemDelete";
import UpdateStockItemDrawer from "../StockItem/UpdateStockItemDrawer";
import StockAddItemDrawer from "../StockItem/StockAddItemDrawer";

interface Props {
  seletedStockInvoice: StockInvoice;
}

const UpdateStockInvoiceForm = ({ seletedStockInvoice }: Props) => {
  const { register, handleSubmit, control } = useForm<StockInvoice>();

  const [errorStockInvoiceCreate, setStockinvoiceCreate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { stockInvoices, setStockInvoices } = useContext(StockInvoiceContext);
  const { setStockItems,  stockItems } = useContext(StockItemContext);
  const { suppliers } = useSupplier();

  const onSubmit = (data: StockInvoice) => {
    const newly = {...data, invoice_no:seletedStockInvoice.invoice_no, stockitems:[]}
    console.log(newly);
    
    
    StockInvoiceService.update(newly, seletedStockInvoice.invoice_no)
      .then((res) => {
        setSuccess("Successfully Updated.");
        setStockInvoices(stockInvoices.map(invoice => invoice.invoice_no === res.data.invoice_no ? res.data: invoice));
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
                defaultValue={seletedStockInvoice.invoice_no}
                disabled
              />
            </div>
            <div className="mb-3">
              <Select {...register("supplier")} className="select p-2">
                <option value={seletedStockInvoice.supplier}>
                  {seletedStockInvoice.supplier
                    ? suppliers.find(
                        (sup) => sup.id === seletedStockInvoice.supplier
                      )?.name
                    : "Select Supplier"}
                </option>
                {suppliers.map((sup, index) => (
                  <option className="mt-3" key={index} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </Select>
              <StockAddItemDrawer selectedStockInvoice={seletedStockInvoice}/>
            </div>
          </div>

          {/* Add Stock items */}
          {seletedStockInvoice.stockitems.length !== 0 && <TableContainer>
            <Table variant="simple">
              <TableCaption>Stock Items List</TableCaption>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th>Item</Th>
                  <Th>Retail Price</Th>
                  <Th >Date</Th>
                  <Th >Cost</Th>
                  <Th >Selling Price</Th>
                  <Th >Discount</Th>
                  <Th>QTY</Th>
                  <Th>Sold Qty</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stockItems.filter(item => item.stock_item_invoice === seletedStockInvoice.invoice_no).map(item => 
                <Tr>
                  <Td><UpdateStockItemDrawer selectedStockItem={item}/></Td>
                  <Td><StockItemDelete selectedStockItem={item}/></Td>
                  <Td>{item.item}</Td>
                  <Td>{item.retail_price}</Td>
                  <Td>{item.date}</Td>
                  <Td>{item.cost}</Td>
                  <Td>{item.selling_price}</Td>
                  <Td>{item.discount}</Td>
                  <Td>{item.qty}</Td>
                  <Td>{item.sold_qty}</Td>
                </Tr>
                  
                  )}
              </Tbody>
            </Table>
          </TableContainer>}
          {/* Add Stock items */}

          {/* Add Stock items */}
          {/* <div className="mb-3">
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
                  <Select
                    {...register(`stockitems.${index}.stock_item_invoice`)}
                    className="select w-100 p-2"
                  >
                    <option key={index} value="2">
                      seleted Invoice
                    </option>
                  </Select>

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
          </div> */}

          {/* Add Items */}

          <div className="w-25">
            <div className="mb-3">
              <Input
                {...register("total_amount")}
                type="number"
                defaultValue={seletedStockInvoice.total_amount}
                placeholder="Total Amount"
              />
            </div>

            <div className="mb-3">
              <Input
                {...register("total_discount")}
                type="number"
                defaultValue={seletedStockInvoice.total_discount}
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
            Update
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UpdateStockInvoiceForm;
