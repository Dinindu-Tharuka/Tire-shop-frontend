import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { UserProfile } from "../../../services/User/user-profile-service";

interface Props {
  userProfile?: UserProfile;
}

const ShowUserProfile = ({ userProfile }: Props) => {
  return (
    <>
      <Table>
        <Tbody>
          <Tr>
            <Th>First Name</Th>
            <Td>{userProfile?.first_name}</Td>
          </Tr>
          <Tr>
            <Th>Last Name</Th>
            <Td>{userProfile?.last_name}</Td>
          </Tr>
          <Tr>
            <Th>Telephone</Th>
            <Td>{userProfile?.telephone}</Td>
          </Tr>
          <Tr>
            <Th>Address</Th>
            <Td>{userProfile?.address}</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default ShowUserProfile;
