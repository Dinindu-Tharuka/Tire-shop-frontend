import {
  Button,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import BillContext from "../../Contexts/Bill/BillContext";
import { useContext } from "react";
import getBillCutUrl from "../Cut URLs/bill-cut-url";
import BillDelete from "./BillDelete";
import BillAddDrawer from "./BillAddDrawer";

const BillTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    bills,
    setBills,
    nextBillPageUrl,
    previousBillPageUrl,
    filterBillPageParams,
    setFilterBillPageParams,
  } = useContext(BillContext);

  // const onDeleteCategory = (category: Category) => {
  //   const originalCategories = [...categories];
  //   setCategories(categories.filter((cat) => cat.id !== category.id));

  //   categoryService.delete(`${category.id}`).catch((err) => {
  //     setCategories(originalCategories);
  //   });
  // };
  return (
    <Flex alignItems="center" flexDir="column">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Bill No</Th>
              <Th>Customer</Th>
              <Th>Date</Th>
              <Th>Discount Amount</Th>
              <Th>Suc Total</Th>
              <Th>Customer Item Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills?.map((bill, index) => (
              <Tr key={index}>
                <Th>
                  <BillAddDrawer/>                  
                </Th>
                <Th>
                  <BillDelete selectedDeleteBill={bill}/>
                </Th>
                <Td>{bill.invoice_id}</Td>
                <Td>{bill.customer}</Td>
                <Td>{bill.date}</Td>
                <Td>{bill.discount_amount}</Td>
                <Td>{bill.sub_total}</Td>
                <Td>{bill.custome_item_value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterBillPageParams(getBillCutUrl(previousBillPageUrl) + "")
          }
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterBillPageParams(getBillCutUrl(nextBillPageUrl) + "")
          }
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default BillTable;
