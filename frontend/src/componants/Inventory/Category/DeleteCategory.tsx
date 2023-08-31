import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useRef } from "react";
import CategoryService, {
  Category,
} from "../../../services/Inventory/category-page-service";
import ItemCategoryContext from "../../../Contexts/Inventory/CategoryContext";

interface Props {
  selectedDeleteCategory: Category;
}

const DeleteCategory = ({ selectedDeleteCategory }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { categories, setCategories } = useContext(ItemCategoryContext);

  const onDeleteSupplier = (category: Category) => {
    const originalSuppliers = [...categories];

    setCategories(categories.filter((cat) => cat.id !== category.id));

    CategoryService.delete(`${category.id}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: "Category",
            description: "Category successfully deleted.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setCategories(originalSuppliers);

        deleteToast({
          title: "Error",
          description: "Category not successfully deleted.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button bg="#f87454" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Supplier {selectedDeleteCategory.category_name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDeleteSupplier(selectedDeleteCategory);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCategory;
