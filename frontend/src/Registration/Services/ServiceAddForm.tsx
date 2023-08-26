import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ServiceContext from "../../Contexts/Registration/ServiceContext";
import ServicesService from "../../services/Registration/services-service";

const ServiceAddForm = () => {
  const { register, handleSubmit } = useForm();

  const [errorServiceUpdate, setErrorServiceUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { services, setServices } = useContext(ServiceContext);

  const onSubmit = (data: FieldValues) => {
    ServicesService.create(data)
      .then((res) => {
        if (res.status === 201) {
          setSuccess("Successfully Created.");
          setServices([res.data, ...services]);
        }
      })
      .catch((err) => setErrorServiceUpdate("Not Successfully Created."));
  };
  return (
    <>
      {errorServiceUpdate && (
        <Text textColor="#dd0939">{errorServiceUpdate}</Text>
      )}
      {success && <Text textColor="#38e17e">{success}</Text>}

      <form onSubmit={handleSubmit(onSubmit)} className="vh-100">
        <div className="d-flex flex-column justify-content-between">
          <div className="mb-3 h-75">
            <Input
              {...register("description")}
              type="text"
              placeholder="Description"
            />
          </div>

          <div className="mb-3 h-75">
            <Input
              {...register("service_value")}
              type="text"
              placeholder="Service Value"
            />
          </div>
        </div>
        <HStack justifyContent="space-between">
          <Button
            type="submit"
            bg={colorMode === "light" ? "#e3a99c" : "#575757"}
            onClick={() => {
              setErrorServiceUpdate("");
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

export default ServiceAddForm;
