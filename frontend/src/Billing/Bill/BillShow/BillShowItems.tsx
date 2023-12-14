import {
  TableContainer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
} from "@chakra-ui/react";
import { Bill } from "../../../services/Billing/bill-page-service";

interface Props {
  selectedBill: Bill;
}

const BillShowItems = ({ selectedBill }: Props) => {
    const { colorMode } = useColorMode();
  return (
    <>
      {selectedBill.bill_items.length !== 0 && (
        <TableContainer>
          <Text
            bg="#f1cac1"
            padding={3}
            borderRadius={10}
            fontWeight="bold"
            textColor={colorMode === "dark" ? "#4d0012" : ""}
          >
            Item List
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr >
                <Th>Item</Th>
                <Th paddingRight={100} textAlign="right">
                  QTY
                </Th>
                <Th paddingRight={100} textAlign="right">
                  customer Discount
                </Th>
                <Th paddingRight={100} textAlign="right">
                  customer Price
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {selectedBill.bill_items.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Text>{item.item}</Text>
                  </Td>
                  <Td paddingRight={100} textAlign="right">
                    {item.qty}
                  </Td>
                  <Td paddingRight={100} textAlign="right">
                    {item.customer_discount}
                  </Td>
                  <Td paddingRight={100} textAlign="right">
                    {item.customer_price}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default BillShowItems;
