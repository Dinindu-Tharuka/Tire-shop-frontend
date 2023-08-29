
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
    Text
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  
  import {
    IoIosArrowDropleftCircle,
    IoIosArrowDroprightCircle,
  } from "react-icons/io";

import ServiceContext from "../../Contexts/Registration/ServiceContext";
import ServiceDelete from "./ServiceDelete";
import UpdateServiceDrawer from "./UpdateServiceDrawer";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../services/pagination-cut-link";
  

const ServicesTable = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const [currentPageNum, setCurrentPageNum] = useState(1)
  const {
    services,
    setServices,
    nextServiceUrl,
    previousServiceUrl,
    isLaodingServicePage,
    errorFetchService,
    servicesCount,
    setFilterServiceParams,
  } = useContext(ServiceContext);

  const numOfPages = Math.ceil(servicesCount / MAXIMUM_PAGES_PER_PAGE)

  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchService && <Text textColor='red'>Unable to fetch data from the internet.</Text>}
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
          isDisabled={currentPageNum === 1 ? true:false}
          onClick={() =>{
            setFilterServiceParams(getCutUrl(previousServiceUrl, 'services') + "")
            setCurrentPageNum(currentPageNum - 1)
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {currentPageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={currentPageNum === numOfPages ? true:false}
          onClick={() =>{
            setFilterServiceParams(getCutUrl(nextServiceUrl, 'services') + "")
            setCurrentPageNum(currentPageNum + 1)
          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  )
}

export default ServicesTable