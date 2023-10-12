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
  Stack,
  Checkbox,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import { makeUpDate } from "../../UI/MakeUpDate";
import RebuildReportsPageContext from "../../../Contexts/Reports/RebuildReortsContext";
import VehicleFilter from "../../../Customer/Vehicle/VehicleFilter";
import FilterCustomer from "../../../Customer/Customer/FilterCustomer";
import useAllCustomers from "../../../hooks/Customer/useAllCustomers";
import RebuiltCustomerInformation from "./RebuildCustomerInformation/RebuiltCustomerInformation";
import RebuildDatedFormModel from "./RebuildDatedReport.tsx/RebuildDatedFormModel";
import { onChangRebuildId, onChangeEndDate, onChangeJobId, onChangeStartDate } from "./FiteringRebuildForms";
import { RebuildReport } from "../../../services/Reports/rebuild-report-service";
import AllRebuildReportsContext from "../../../Contexts/Reports/AllRebuildReportsContext";

const RebuiltReports = () => {
  //Sending status
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isReceived, setIsReceived] = useState(false);

  // avoid fitltering
  const [typeRebuildId, setTypeRebuildId] = useState("");
  const [typeJobNo, setTypeJobNo] = useState("");

  // to Filtering
  const [reportArrayList, setReportArrayList] = useState<RebuildReport[]>([]);

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
    setPageReportStartDateFilter,
    setPageReportEndDateFilter,
  } = useContext(RebuildReportsPageContext);

  const {
    allRebuildReports,
    setAllRebuildReports,
    setReportsRebuildIdFilter,
    setReportsJobNoFilter,
    setReportStartDateFilter,
    setReportEndDateFilter,
  } = useContext(AllRebuildReportsContext);

  useEffect(() => {
    if (typeRebuildId.length === 0 && typeJobNo.length === 0) {
      setReportArrayList(rebuildPageReports);
    } else {
      setReportArrayList(allRebuildReports);
    }

    if (isAccepted) {
      // for ui
      setReportArrayList(
        allRebuildReports.filter(
          (report) =>
            report.taken_date && !report.send_date && !report.received_date
        )
      );
    }

    if (isSent) {
      // for ui
      setReportArrayList(
        allRebuildReports.filter(
          (report) => report.send_date && !report.received_date
        )
      );
    }

    if (isReceived) {
      // for ui
      setReportArrayList(
        allRebuildReports.filter((report) => report.received_date)
      );
    }
  }, [isSent, isAccepted, isReceived, rebuildPageReports]);

  const numOfPages = Math.ceil(
    rebuildPageReportsCount / MAXIMUM_PAGES_PER_PAGE
  );
  return (
    <Flex alignItems="center" flexDir="column">
      <VStack marginBottom={10}>
        <HStack width="60vw">
          <RebuiltCustomerInformation reports={reportArrayList} />
          <RebuildDatedFormModel reports={reportArrayList} />
        </HStack>

        {/* // Date range */}
        <HStack>
          <InputGroup>
            <InputLeftAddon children="Start" />
            <Input type="date" onChange={(e)=> {
              onChangeStartDate(e, setPageReportStartDateFilter, setReportStartDateFilter)
              setErrorFetchRebuildPageReports('')
              }}/>
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="End" />
            <Input type="date" onChange={(e)=> {
              setErrorFetchRebuildPageReports('')
              onChangeEndDate(e, setPageReportEndDateFilter, setReportEndDateFilter)}}/>
          </InputGroup>
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
              onChangRebuildId(
                e,
                setPageReportsRebuildIdFilter,
                setReportsRebuildIdFilter
              );
              setTypeRebuildId(e.currentTarget.value);
            }}
          />
          <Input
            placeholder="Job No"
            onChange={(e) => {
              setErrorFetchRebuildPageReports("");
              onChangeJobId(
                e,
                setPageReportsJobNoFilter,
                setReportsJobNoFilter
              );
              setTypeJobNo(e.currentTarget.value);
            }}
          />
          <FilterCustomer />
          <VehicleFilter />
        </HStack>
        <HStack>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox
              size="lg"
              colorScheme="orange"
              onChange={() => {
                isAccepted === false
                  ? setIsAccepted(true)
                  : setIsAccepted(false);
              }}
            >
              Accepted
            </Checkbox>

            <Checkbox
              size="lg"
              colorScheme="orange"
              onChange={() => {
                isSent === false ? setIsSent(true) : setIsSent(false);
              }}
            >
              Send
            </Checkbox>
            <Checkbox
              size="lg"
              colorScheme="orange"
              onChange={() => {
                isReceived === false
                  ? setIsReceived(true)
                  : setIsReceived(false);
              }}
            >
              Received
            </Checkbox>
          </Stack>
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
            {reportArrayList.map((report, index) => (
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
                <Td>{report.cost ? report.cost : "No"}</Td>
                <Td>{report.status === 'received' ? 'Received' : report.status === 'send'? 'Send': "Not Send"}</Td>
                <Td>{makeUpDate(report.taken_date)}</Td>
                <Td>
                  {report.send_date !== null
                    ? makeUpDate(report.send_date)
                    : "Not Send"}{" "}
                </Td>
                <Td>
                  {report.received_date !== null
                    ? makeUpDate(report.received_date)
                    : "Not Received"}
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
