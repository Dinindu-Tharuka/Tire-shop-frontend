import { Button, HStack, Input, Text, useColorMode } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ServicesService,{ Service } from "../../services/Registration/services-service";
import ServiceContext from "../../Contexts/Registration/ServiceContext";


interface Props {
  selectedService: Service;
}

const UpdateServiceForm = ({selectedService}:Props) => {
    const { register, handleSubmit } = useForm();

  const [errorServiceUpdate, setErrorServiceUpdate] = useState("");
  const [success, setSuccess] = useState("");
  const { toggleColorMode, colorMode } = useColorMode();

  const { services, setServices } = useContext(ServiceContext);

  const onSubmit = (data: FieldValues) => {
    const updated: Service = {
      id: selectedService.id,
      description: data.description,
      service_value: data.service_value,
      
    };

    ServicesService.update(updated, `${updated.id}`)
      .then((res) => {
        if (res.status === 200) {
          setSuccess("Successfully Updated.");
          setServices(
            services.map((ser) => (ser.id === updated.id ? updated : ser))
          );
        }
      })
      .catch((err) => setErrorServiceUpdate("Not Successfully Updated."));
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
              defaultValue={selectedService.description}
            />
          </div>

          <div className="mb-3 h-75">
            <Input
              {...register("service_value")}
              type="text"
              placeholder="Service Value"
              defaultValue={selectedService.service_value}
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
            Update
          </Button>
        </HStack>
      </form>
    </>
  )
}

export default UpdateServiceForm