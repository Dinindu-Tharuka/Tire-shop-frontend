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
  Spinner
} from "@chakra-ui/react";
import UpdateSupplierDrawer from "./UpdateSupplierDrawer";
import { useContext, useState } from "react";
import SupplierContext from "../../Contexts/Registration/SupplierContext";
import SupplierService, {
  Supplier,
} from "../../services/Registration/supplier-service";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import DeleteSupplier from "./DeleteSupplier";
import getCutUrl, { MAXIMUM_PAGES_PER_PAGE } from "../../services/pagination-cut-link";

const SupplierTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [pageNum, setPageNum] = useState(1)
  const {
    suppliers,
    setSuppliers,
    nextSupplierUrl,
    previousSupplierUrl,
    setErrorFetchSupplier,
    setFilterSupplierParams,
    errorFetchSupplier,
    isLoadingSupplierPage,
    suppliersCount
  } = useContext(SupplierContext);

  const numOfPages = Math.ceil(suppliersCount / MAXIMUM_PAGES_PER_PAGE);

  if (isLoadingSupplierPage)
    return <Spinner/>
  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchSupplier && <Text textColor='red'>Unable to fetch data from the internet.</Text>}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Telephone</Th>
              <Th>Mobile</Th>
              <Th>Email</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {suppliers?.map((supplier, index) => (
              <Tr key={supplier.id}>
                <Td>{supplier.name}</Td>
                <Td>{supplier.address}</Td>
                <Td>{supplier.telephone}</Td>
                <Td>{supplier.mobile}</Td>
                <Td>{supplier.email}</Td>
                <Td>
                  <UpdateSupplierDrawer selecedSupplier={supplier} />
                </Td>
                <Td>
                  <DeleteSupplier selectedDeleteSupplier={supplier} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={pageNum === 1? true:false}
          onClick={() =>{
            setFilterSupplierParams(getCutUrl(previousSupplierUrl, 'suppliers') + "")
            setPageNum(pageNum - 1)
            setErrorFetchSupplier('')
          }}
        >
          <IoIosArrowDropleftCircle />
        </Button>
        <Text fontWeight='semibold'>page {pageNum} of {numOfPages}</Text>
        <Button
          colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
          isDisabled={pageNum === numOfPages? true:false}
          onClick={() =>{
            setFilterSupplierParams(getCutUrl(nextSupplierUrl, 'suppliers') + "")
            setPageNum(pageNum + 1)
            setErrorFetchSupplier('')

          }}
        >
          <IoIosArrowDroprightCircle />
        </Button>
      </HStack>
    </Flex>
  );
};

export default SupplierTable;
