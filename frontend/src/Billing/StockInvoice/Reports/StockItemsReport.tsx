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
  Input,
  VStack,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import StockItemsPageContext from "../../../Contexts/Stock/StockItemPageContext";
import {
  onChangeBrand,
  onChangeEndDate,
  onChangeInvoiceNo,
  onChangeItemId,
  onChangeSize,
  onChangeStartDate,
} from "./StockItemsReportsFiltering";
import { AllItemContext } from "../../../Contexts/Inventory/AllItemContest";
import AllStockItemsContext from "../../../Contexts/Stock/AllStockItemContext";
import GrnReportModel from "./GRN Report/GrnReportModel";

const StockItemsReport = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const { colorMode } = useColorMode();

  const { allItems } = useContext(AllItemContext);

  const {
    stockItems,
    setStockItemsInvoiceNoFilter,
    setStockItemsItemIdFilter,
    setStockItemsBrandFilter,
    setStockItemsSizeFilter,
    setStockItemsStartDateFilter,
    setStockItemsEndDateFilter,
  } = useContext(AllStockItemsContext);

  const {
    pageStockItemsCount,
    errorFetchPageStockItems,
    pageStockItems,
    setFilterPageStockItemsParams,
    previousPageStockItemsUrl,
    nextPageStockItemsTyresUrl,
    setErrorFetchPageStockItems,
    setPageStockItemsInvoiceNoFilter,
    setPageStockItemsItemIdFilter,
    setPageStockItemsBrandFilter,
    setPageStockItemsSizeFilter,
    setPageStockItemsStartDateFilter,
    setPageStockItemsEndDateFilter,
  } = useContext(StockItemsPageContext);

  const numOfPages = Math.ceil(pageStockItemsCount / MAXIMUM_PAGES_PER_PAGE);

  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchPageStockItems && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <VStack>
        <HStack width='58vw'>
          <GrnReportModel stockItems={stockItems}/>
        </HStack>
        <HStack>
          <Input
            placeholder="Invoice No"
            onChange={(e) => {
              setErrorFetchPageStockItems("");
              onChangeInvoiceNo(e, setPageStockItemsInvoiceNoFilter, setStockItemsInvoiceNoFilter);
            }}
          />
          <Input
            placeholder="Item Id"
            onChange={(e) => {
              setErrorFetchPageStockItems("");
              onChangeItemId(e, setPageStockItemsItemIdFilter, setStockItemsItemIdFilter);
            }}
          />
          <Input
            placeholder="Brand"
            onChange={(e) => {
              setErrorFetchPageStockItems("");
              onChangeBrand(e, setPageStockItemsBrandFilter, setStockItemsBrandFilter);
            }}
          />
          <Input
            placeholder="Size"
            onChange={(e) => {
              setErrorFetchPageStockItems("");
              onChangeSize(e, setPageStockItemsSizeFilter, setStockItemsSizeFilter);
            }}
          />
        </HStack>
        <HStack>
          <InputGroup>
            <InputLeftAddon children="Start" />
            <Input
              type="date"
              onChange={(e) =>{
                setErrorFetchPageStockItems("");
                onChangeStartDate(e, setPageStockItemsStartDateFilter, setStockItemsStartDateFilter)
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="End" />
            <Input
              type="date"
              onChange={(e) =>
                onChangeEndDate(e, setPageStockItemsEndDateFilter, setStockItemsEndDateFilter)
              }
            />
          </InputGroup>
        </HStack>
      </VStack>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Invoice No</Th>
              <Th>Item Id</Th>
              <Th>Brand</Th>
              <Th>Size</Th>
              <Th>Retail Price</Th>
              <Th>Cost</Th>
              <Th>Customer Price</Th>
              <Th>Qty</Th>
              <Th>Bought qty</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageStockItems?.map((stockitem, index) => (
              <Tr key={index}>
                <Td>{stockitem.stock_invoice}</Td>
                <Td>{stockitem.item}</Td>
                <Td>
                  {
                    allItems.find((item) => item.item_id === stockitem.item)
                      ?.brand
                  }
                </Td>
                <Td>
                  {
                    allItems.find((item) => item.item_id === stockitem.item)
                      ?.size
                  }
                </Td>
                <Td>{stockitem.retail_price}</Td>
                <Td>{stockitem.cost}</Td>
                <Td>{stockitem.customer_price}</Td>
                <Td>{stockitem.qty}</Td>
                <Td>{stockitem.max_qty}</Td>
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
            setFilterPageStockItemsParams(
              getCutUrl(previousPageStockItemsUrl, "stock-item-page-list") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchPageStockItems("");
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
            setFilterPageStockItemsParams(
              getCutUrl(nextPageStockItemsTyresUrl, "stock-item-page-list") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchPageStockItems("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default StockItemsReport;
