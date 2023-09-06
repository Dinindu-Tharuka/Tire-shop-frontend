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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserContext from "../../Contexts/User/UserContext";
import UserDeleteDrawer from "./UserDeleteDrawer";

const UserListTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [pageNum, setPageNum] = useState(1);
  const {
    users,
    setUsers,
    errorFetchUsers,
    isLoadingUsers,
    setErrorFetchUser
  } = useContext(UserContext);
  if (isLoadingUsers) return <Spinner />;
  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchUsers && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
      <Text fontWeight="semibold" align='center'>
          Users Count {users.length}
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>User Name</Th>
              <Th>Email</Th>  
              <Th>Designation</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => {
              return (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.user_name}</Td>
                  <Td>{user.email}</Td>    
                  <Td>{user.is_manager ? 'Manager': user.is_superuser ? 'Superuser': 'Cashier'}</Td>  
                  <Td><UserDeleteDrawer selectedDeleteUser={user}/></Td>            
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

    </Flex>
  );
};

export default UserListTable;
