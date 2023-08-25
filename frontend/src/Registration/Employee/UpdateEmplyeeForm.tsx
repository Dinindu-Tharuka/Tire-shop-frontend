import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import EmployeeService, {
  Employee,
} from "../../services/Registration/employee-service";
import EmployeeContext from "../../Contexts/Registration/EmployeeContecxt";

interface Props {
  selectedEmployee: Employee;
}

const UpdateEmplyeeForm = ({ selectedEmployee }: Props) => {
  const { register, handleSubmit } = useForm();

  const [errorCategoryUpdate, setErrorCategoryUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { employees, setEmployees } = useContext(EmployeeContext);

  const onSubmit = (data: FieldValues) => {
    const updated: Employee = {
      id: selectedEmployee.id,
      nic: data.nic,
      name: data.name,
      address: data.address,
      telephone: data.telephone,
      designation: data.designation,
    };

    EmployeeService.update(updated, `${updated.id}`)
      .then((res) => {
        if (res.status === 200) {
          setSuccess("Successfully Updated.");
          setEmployees(
            employees.map((sup) => (sup.id === updated.id ? updated : sup))
          );
        }
      })
      .catch((err) => setErrorCategoryUpdate("Not Successfully Updated."));
  };
  return (
    <>
      {errorCategoryUpdate && (
        <Text textColor="#dd0939">{errorCategoryUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("nic")}
              type="text"
              placeholder="Name"
              defaultValue={selectedEmployee.nic}
            />
          </div>

          <div className="mb-3 h-75">
            <Input
              {...register("name")}
              type="text"
              placeholder="Name"
              defaultValue={selectedEmployee.name}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register("address")}
              type="text"
              placeholder="Adress"
              defaultValue={selectedEmployee.address}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("telephone")}
              type="text"
              placeholder="Mobile"
              defaultValue={selectedEmployee.telephone}
            />
          </div>
          <div className="mb-3">
            <Input
              {...register("designation")}
              type="text"
              placeholder="Telephone"
              defaultValue={selectedEmployee.designation}
            />
          </div>
          
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorCategoryUpdate("");
              setSuccess("");
            }}
          >
            Save
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default UpdateEmplyeeForm;
