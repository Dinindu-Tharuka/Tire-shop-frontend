import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import UserProfileUpdateForm from "./UserProfileUpdateForm";

export const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={20}
        boxShadow="dark-lg"
        paddingX={10}
        fontSize="xl"
        paddingY={6}
        bg={colorMode === "light" ? "#e3a99c" : "#252528"}
      >
        Profile
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserProfileUpdateForm onClose={() => onClose()} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
