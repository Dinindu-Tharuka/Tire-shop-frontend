import {
  Button,
  Flex,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";
import DeleteEmployee from "./DeleteEmployee";
import UpdateEmployeeDrawer from "./UpdateEmployeeDrawer";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../services/pagination-cut-link";

const EmployeeTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [currentPageNum, setCurrentPageNum] = useState(1)

  const {
    employees,
    setEmployees,
    nextEmployeeUrl,
    previousEmployeeUrl,
    isLoadingEmployees,
    setFilterEmployeeParams,
    errorFetchEmployee,
    employeeCount,
    setErrorFetchEmployee
  } = useContext(EmployeeContext);

  const numOfPages = Math.ceil(employeeCount / MAXIMUM_PAGES_PER_PAGE)

  if(isLoadingEmployees)
    return <Spinner/>

  
  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchEmployee && <Text textColor='red'>Unable to fetch data from the internet.</Text>}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>NIC</Th>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Telephone</Th>
              <Th>Designation</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees?.map((employee, index) => (
              <Tr key={employee.id}>
                <Td>{employee.nic}</Td>
                <Td>{employee.name}</Td>
                <Td>{employee.address}</Td>
                <Td>{employee.telephone}</Td>
                <Td>{employee.designation}</Td>
                <Td>
                  <UpdateEmployeeDrawer selecedEmployee={employee}/>
                </Td>
                <Td>
                  <DeleteEmployee selectedDeleteEmployee={employee}/>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled = {currentPageNum === 1 ? true:false}
          onClick={() =>{
            setFilterEmployeeParams(getCutUrl(previousEmployeeUrl, 'employees') + "")
            setCurrentPageNum(currentPageNum - 1)
            setErrorFetchEmployee('')
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true:false}
          onClick={() =>{
            setFilterEmployeeParams(getCutUrl(nextEmployeeUrl, 'employees') + "")
            setCurrentPageNum(currentPageNum + 1)
            setErrorFetchEmployee('')
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default EmployeeTable;
