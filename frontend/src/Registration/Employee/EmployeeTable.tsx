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
import { useContext } from "react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";
import DeleteEmployee from "./DeleteEmployee";
import UpdateEmployeeDrawer from "./UpdateEmployeeDrawer";
import getCutUrl from "../../services/pagination-cut-link";

const EmployeeTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const {
    employees,
    setEmployees,
    nextEmployeeUrl,
    previousEmployeeUrl,
    filterEmployeeParams,
    setFilterEmployeeParams,
  } = useContext(EmployeeContext);

  
  return (
    <Flex alignItems="center" flexDir="column">
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
          onClick={() =>
            setFilterEmployeeParams(getCutUrl(previousEmployeeUrl, 'employees') + "")
          }
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterEmployeeParams(getCutUrl(nextEmployeeUrl, 'employees') + "")
          }
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default EmployeeTable;
