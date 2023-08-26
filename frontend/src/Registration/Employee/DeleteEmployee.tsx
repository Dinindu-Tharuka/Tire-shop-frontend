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
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";
import EmployeeService, {
  Employee,
} from "../../services/Registration/employee-service";

interface Props{
    selectedDeleteEmployee:Employee
}

const DeleteEmployee = ({selectedDeleteEmployee}:Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast()

  const { employees, setEmployees } = useContext(EmployeeContext);

  const onDeleteEmployee = (employee: Employee) => {
    const originalSuppliers = [...employees];

    setEmployees(employees.filter((emp) => emp.id !== employee.id));

    EmployeeService
      .delete(`${employee.id}`)
      .then(res => {
        if (res.status === 204){
        deleteToast({
          title: 'Employee',
            description: "Employee successfully deleted.",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })}
      })
      .catch((err) =>{
      setEmployees(originalSuppliers)

      deleteToast({
        title: 'Error',
          description: "Employee not successfully deleted.",
          status: 'error',
          duration: 2000,
          isClosable: true,
      })}
    );
  };
  return (
    <>
      <Button bg='#f87454' onClick={onOpen}>
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
              Delete Employee {selectedDeleteEmployee.name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={()=>{
                onClose()
                onDeleteEmployee(selectedDeleteEmployee)
                }}  ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteEmployee;
