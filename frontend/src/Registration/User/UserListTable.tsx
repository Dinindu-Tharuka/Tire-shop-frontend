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
import ShowUserProfile from "./User Profile/ShowUserProfile";
import UserProfileContext from "../../Contexts/User/UserProfileContext";
import ShowUserProfileModel from "./User Profile/ShowUserProfileModel";
import UserMeContext from "../../Contexts/User/UserMe";

const UserListTable = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const [pageNum, setPageNum] = useState(1);
  const {userProfiles} = useContext(UserProfileContext)
  const userME = useContext(UserMeContext)

  const {
    users,
    setUsers,
    errorFetchUsers,
    isLoadingUsers,
    setErrorFetchUser
  } = useContext(UserContext);

  console.log(users)
  if (isLoadingUsers) return <Spinner />;
  return (
    <Flex alignItems="center" flexDir="column">
      {errorFetchUsers && (
        <Text textColor="red">Unable to fetch data from the internet.</Text>
      )}
      <TableContainer>
      <Text fontWeight="semibold" align='center'>
          Users ({users.length})
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th>Id</Th>
              <Th>User Name</Th>
              <Th>Email</Th>  
              <Th>Designation</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => {
              return (
                <Tr key={user.id}>
                  <Td><ShowUserProfileModel userProfile={userProfiles.find(profile => profile.user_account_id === user.id)}/></Td>
                  <Td>{!user.is_superuser && <UserDeleteDrawer selectedDeleteUser={user}/>}</Td>            
                  <Td>{user.id}</Td>
                  <Td>{user.user_name}</Td>
                  <Td>{user.email}</Td>    
                  <Td>{user.is_manager ? 'Manager': user.is_superuser ? 'Superuser': 'Cashier'}</Td>  
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
