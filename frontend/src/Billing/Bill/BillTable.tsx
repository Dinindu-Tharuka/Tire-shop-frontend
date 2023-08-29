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
  Text,
  Spinner
} from "@chakra-ui/react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import BillContext from "../../Contexts/Bill/BillContext";
import { useContext, useState } from "react";
import BillDelete from "./BillDelete";
import BillAddDrawer from "./BillAddDrawer";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../services/pagination-cut-link";

const BillTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [ currentPage, setCurrentPage] = useState(1)
  const {
    bills,
    nextBillPageUrl,
    previousBillPageUrl,
    setFilterBillPageParams,
    isLoadingBills,
    billCount,
    billFetchError
  } = useContext(BillContext);

  const numOfpages = Math.ceil(billCount/ MAXIMUM_PAGES_PER_PAGE)

  
  if (isLoadingBills)
    return <Spinner/>

  return (
    <>
    <Flex alignItems="center" flexDir="column">    
    {billFetchError && <Text textColor='red'>Unable to fetch data from the internet.</Text>}  
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
                  <BillAddDrawer />
                </Th>
                <Th>
                  <BillDelete selectedDeleteBill={bill} />
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
          isDisabled={currentPage === 1 ? true:false}
          onClick={() =>{
            setFilterBillPageParams(getCutUrl(previousBillPageUrl, 'bills') + '')
            setCurrentPage(currentPage - 1)
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPage} of {numOfpages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPage === numOfpages ? true:false}
          onClick={() =>{
            setFilterBillPageParams(getCutUrl(nextBillPageUrl, 'bills') + '')
            setCurrentPage(currentPage + 1)
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
    </>
  );
};

export default BillTable;
