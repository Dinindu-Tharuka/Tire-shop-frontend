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
  Spinner,
  Input,
} from "@chakra-ui/react";

import { useContext, useState } from "react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import { makeUpDate } from "../../UI/MakeUpDate";
import SendTyreContext from "../../../Contexts/Rebuild/SendTyreContext";
import SupplierContext from "../../../Contexts/Registration/SupplierContext";
import SendTyreDelete from "./SendTyreDelete";
import SendTyreUpdateDrawer from "./SendTyreUpdateDrawer";

const SendTyreTable = () => {
  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const {
    sendTyres,
    setSendTyres,
    errorFetchSendTyres,
    setErrorFetchSendTyres,
    nextSendTyresUrl,
    previousSendTyresUrl,
    filterSendTyreParams,
    setFilterSendTyreParams,
    isLoadingSendTyre,
    sendTyreCount,
    setSendTyreNameFilter,
  } = useContext(SendTyreContext);

  const { suppliers } = useContext(SupplierContext);

  const numOfPages = Math.ceil(sendTyreCount / MAXIMUM_PAGES_PER_PAGE);

  return (
    <Flex alignItems="center" flexDir="column">
      {/* <Input placeholder="Search Bill No" onKeyUp={onTypeFilter} /> */}
      {errorFetchSendTyres && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Order No</Th>
              <Th>Supplier</Th>
              <Th>Taken Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sendTyres.map((tyre, index) => (
              <Tr key={index}>
                <Th>
                  <SendTyreUpdateDrawer selectedSendTyre={tyre} />
                </Th>
                <Th>
                  <SendTyreDelete selectedSendTyre={tyre} />
                </Th>
                <Td>{tyre.order_no}</Td>
                <Td>
                  {
                    suppliers.find((supplier) => supplier.id === tyre.supplier)
                      ?.name
                  }
                </Td>

                <Td>{makeUpDate(tyre.taken_date)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === 1 ? true : false}
          onClick={() => {
            setFilterSendTyreParams(
              getCutUrl(previousSendTyresUrl, "send-tyres-list") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchSendTyres("");
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight="semibold">
          page {currentPageNum} of {numOfPages}
        </Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true : false}
          onClick={() => {
            setFilterSendTyreParams(
              getCutUrl(nextSendTyresUrl, "send-tyres-list") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchSendTyres("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default SendTyreTable;
