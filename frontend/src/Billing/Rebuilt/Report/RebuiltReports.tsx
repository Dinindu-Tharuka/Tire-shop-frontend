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
  Spinner,
  Box,
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
import RebuildReportsPageContext from "../../../Contexts/Reports/RebuildReortsContext";
import {
  onChangRebuildId,
  onChangeJobId,
  onChangeSelectCustomer,
} from "./fiteringRebuildForms";
import VehicleFilter from "../../../Customer/Vehicle/VehicleFilter";
import FilterCustomer from "../../../Customer/Customer/FilterCustomer";
import useAllCustomers from "../../../hooks/Customer/useAllCustomers";
import RebuiltCustomerInformation from "./RebuildCustomerInformation/RebuiltCustomerInformation";
import RebuildDatedFormModel from "./RebuildDatedReport.tsx/RebuildDatedFormModel";

const RebuiltReports = () => {
  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const { allCustomers } = useAllCustomers();

  const {
    rebuildPageReports,
    errorFetchRebuildPageReports,
    setErrorFetchRebuildPageReports,
    nextRebuildPageReportsUrl,
    previousRebuildPageReportsUrl,
    setFilterRebuildPageReportsParams,
    rebuildPageReportsCount,
    isLoadingRebuildPageReportsPage,
    setPageReportsRebuildIdFilter,
    setPageReportsJobNoFilter,
    setPageReportsCustomerFilter,
    setPageReportVehicleFilter, 
  } = useContext(RebuildReportsPageContext);

  const numOfPages = Math.ceil(
    rebuildPageReportsCount / MAXIMUM_PAGES_PER_PAGE
  );
  return (
    <Flex alignItems="center" flexDir="column">
      <VStack marginBottom={10}>
        {/* // Date range */}
        {/* <HStack>
          <InputGroup>
            <InputLeftAddon children="Start" />
            <Input type="date" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="End" />
            <Input type="date" />
          </InputGroup>
        </HStack> */}

        <HStack width='60vw'>
          <RebuiltCustomerInformation reports={rebuildPageReports} />
          <RebuildDatedFormModel reports={rebuildPageReports}/>
        </HStack>

        {/* // Others */}
        <HStack>
          <Box marginEnd={5}>
            {isLoadingRebuildPageReportsPage && <Spinner />}
          </Box>
          <Input
            placeholder="Rebuild Id"
            onChange={(e) => {
              setErrorFetchRebuildPageReports("");
              onChangRebuildId(e, setPageReportsRebuildIdFilter);
            }}
          />
          <Input
            placeholder="Job No"
            onChange={(e) => {
              setErrorFetchRebuildPageReports("");
              onChangeJobId(e, setPageReportsJobNoFilter);
            }}
          />
          <FilterCustomer />
          <VehicleFilter />
        </HStack>
      </VStack>
      {errorFetchRebuildPageReports && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Rebuild ID</Th>
              <Th>Job No</Th>
              <Th>Customer</Th>
              <Th>Vehicle</Th>
              <Th>Cost</Th>
              <Th>Status</Th>
              <Th>Taken Date</Th>
              <Th>Send Date</Th>
              <Th>Received Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rebuildPageReports.map((report, index) => (
              <Tr key={index}>
                <Th>{/* Show */}</Th>
                <Td>{report.rebuild_id}</Td>
                <Td>{report.job_no !== null ? report.job_no : "No"}</Td>
                <Td>
                  {
                    allCustomers.find(
                      (customer) => customer.id === report.customer
                    )?.name
                  }
                </Td>
                <Td>{report.vehicle}</Td>
                <Td>{report.cost ? report.cost : "not received"}</Td>
                <Td>{report.status !== null ? report.status : "not send"}</Td>
                <Td>{makeUpDate(report.taken_date)}</Td>
                <Td>
                  {report.send_date !== null
                    ? makeUpDate(report.send_date)
                    : "not send"}{" "}
                </Td>
                <Td>
                  {report.received_date !== null
                    ? makeUpDate(report.received_date)
                    : "not received"}
                </Td>
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
            setFilterRebuildPageReportsParams(
              getCutUrl(previousRebuildPageReportsUrl, "rebuild-page-reports") +
                ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchRebuildPageReports("");
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
            setFilterRebuildPageReportsParams(
              getCutUrl(nextRebuildPageReportsUrl, "rebuild-page-reports") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchRebuildPageReports("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default RebuiltReports;
