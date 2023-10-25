import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useColorModeValue
} from "@chakra-ui/react";
import ShowUserProfile from "./ShowUserProfile";
import { UserProfile } from "../../../services/User/user-profile-service";

interface Props {
  userProfile?: UserProfile;
}

const ShowUserProfileModel = ({ userProfile }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} bg={useColorModeValue("#f1cac1" , "")}>show profile</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Profile</ModalHeader>
          <ModalBody>
            <ShowUserProfile userProfile={userProfile} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShowUserProfileModel;
