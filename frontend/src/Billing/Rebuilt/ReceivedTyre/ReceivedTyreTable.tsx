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
import ReceivedTyreContext from "../../../Contexts/Rebuild/Received/ReceivedTyreContex";
import ReceivedTyreDelete from "./ReceivedTyreDelete";

const ReceivedTyreTable = () => {
  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const {
    receivedTyres,
    setReceivedTyres,
    errorFetchReceivedTyres,
    setErrorFetchReceivedTyres,
    nextReceivedTyresUrl,
    previousReceivedTyresUrl,
    filterReceivedTyreParams,
    setFilterReceivedTyreParams,
    isLoadingReceivedTyre,
    receivedTyreCount,
    setReceivedTyreNameFilter,
  } = useContext(ReceivedTyreContext);

  const numOfPages = Math.ceil(receivedTyreCount / MAXIMUM_PAGES_PER_PAGE);
  return (
    <Flex alignItems="center" flexDir="column">
      {/* <Input placeholder="Search Bill No" onKeyUp={onTypeFilter} /> */}
      {errorFetchReceivedTyres && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Invoice No</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {receivedTyres.map((tyre, index) => (
              <Tr key={index}>
                <Th>
                  {/* <SendTyreUpdateDrawer selectedSendTyre={tyre} /> */}
                </Th>
                <Th>
                  <ReceivedTyreDelete selectedReceivedTyre={tyre} />
                </Th>
                <Td>{tyre.invoice_no}</Td>

                <Td>{makeUpDate(tyre.date)}</Td>
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
            setFilterReceivedTyreParams(
              getCutUrl(previousReceivedTyresUrl, "received-tyres-list") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchReceivedTyres("");
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
            setReceivedTyreNameFilter(
              getCutUrl(nextReceivedTyresUrl, "received-tyres-list") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchReceivedTyres("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default ReceivedTyreTable;
