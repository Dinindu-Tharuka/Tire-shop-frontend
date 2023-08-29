
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

import ServiceContext from "../../Contexts/Registration/ServiceContext";
import ServiceDelete from "./ServiceDelete";
import UpdateServiceDrawer from "./UpdateServiceDrawer";
import getCutUrl from "../../services/pagination-cut-link";
  

const ServicesTable = () => {
    const { toggleColorMode, colorMode } = useColorMode();
  const {
    services,
    setServices,
    nextServiceUrl,
    previousServiceUrl,
    filterServiceParams,
    setFilterServiceParams,
  } = useContext(ServiceContext);
  return (
    <Flex alignItems="center" flexDir="column">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Service Value</Th>              
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {services?.map((service, index) => (
              <Tr key={service.id}>
                <Td>{service.description}</Td>
                <Td>{service.service_value}</Td>                
                <Td>
                  <UpdateServiceDrawer selecedService={service}/>
                </Td>
                <Td>
                  <ServiceDelete selectedDeleteService={service}/>
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
            setFilterServiceParams(getCutUrl(previousServiceUrl, 'services') + "")
          }
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          onClick={() =>
            setFilterServiceParams(getCutUrl(nextServiceUrl, 'services') + "")
          }
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  )
}

export default ServicesTable