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
import TakenTyreContext from "../../../Contexts/Rebuild/TakenTyreContext";
import getCutUrl, {
  MAXIMUM_PAGES_PER_PAGE,
} from "../../../services/pagination-cut-link";
import CustomerContext from "../../../Contexts/Customer/CustomerContext";
import useVehicles from "../../../hooks/Customer/useVehicles";
import { makeUpDate } from "../../UI/MakeUpDate";
import TakenTyreDelete from "./TakenTyreDelete";
import TakenTyreUpdateDrawer from "./TakenTyreUpdateDrawer";

const TyreTakenTable = () => {
  const { colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const {
    takenTyres,
    setTakenTyres,
    errorFetchTakenTyres,
    setErrorFetchTakenTyres,
    nextTakenTyresUrl,
    previousTakenTyresUrl,
    filterTakenTyreParams,
    setFilterTakenTyreParams,
    isLoadingTakenTyre,
    takenTyreCount,
    setTakenTyreNameFilter,
  } = useContext(TakenTyreContext);

  const { customers } = useContext(CustomerContext);

  const { vehicles, setVehicles } = useVehicles();

  const numOfPages = Math.ceil(takenTyreCount / MAXIMUM_PAGES_PER_PAGE);

  // const onTypeFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   setBillIdFilter(event.currentTarget.value);
  // };

  return (
    <Flex alignItems="center" flexDir="column">
      {/* <Input placeholder="Search Bill No" onKeyUp={onTypeFilter} /> */}
      {errorFetchTakenTyres && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Customer</Th>
              <Th>Vehicle</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {takenTyres.map((tyre, index) => (
              <Tr key={index}>
                <Th>
                  <TakenTyreUpdateDrawer selectedTakenTyre={tyre} />
                </Th>
                <Th>
                  <TakenTyreDelete selectedTakenTyre={tyre} />
                </Th>
                <Td>
                  {
                    customers.find((customer) => customer.id === tyre.customer)
                      ?.name
                  }
                </Td>
                <Td>
                  {
                    vehicles.find(
                      (vehicle) => vehicle.vehical_no === tyre.vehicle
                    )?.vehical_no
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
            setFilterTakenTyreParams(
              getCutUrl(previousTakenTyresUrl, "bills") + ""
            );
            setCurrentPageNum(currentPageNum - 1);
            setErrorFetchTakenTyres("");
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
            setFilterTakenTyreParams(
              getCutUrl(nextTakenTyresUrl, "bills") + ""
            );
            setCurrentPageNum(currentPageNum + 1);
            setErrorFetchTakenTyres("");
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default TyreTakenTable;
