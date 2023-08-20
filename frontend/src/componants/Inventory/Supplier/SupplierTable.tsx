import {
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react";

import { Supplier } from "../../../services/Inventory/supplier-service";

  interface Props {
    suppliers: Supplier[];
    // onDeleteSupplier: (supplier: Supplier) => void;
    // onUpdatedSupplier: (supplier:Supplier)=> void;
  }

const SupplierTable = ({ suppliers }: Props) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
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
            {suppliers?.map((suppier, index) => (
              <Tr key={suppier.id}>
                <Td>{index + 1}</Td>
                <Td>{suppier.name}</Td>
                <Td>{suppier.address}</Td>
                <Td>{suppier.telephone}</Td>
                <Td>{suppier.mobile}</Td>
                <Td>{suppier.email}</Td>
                <Td>
                  {/* <UpdateCategoryDrawer onUpdatedCategory={onUpdatedCategory
                  } updateCategory={suppier} /> */}
                </Td>
                <Td>
                  <Button
                    padding={4}
                    // onClick={() => onDeleteSupplier(suppier)}
                    bg="#f87454"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SupplierTable