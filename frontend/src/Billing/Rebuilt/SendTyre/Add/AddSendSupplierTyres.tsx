import { Input, Button, Flex, HStack, Select } from "@chakra-ui/react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { IoAddCircle } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import {
  SendSupplierTyre,
  SendTyre,
} from "../../../../services/Rebuild/send-tyre-service";
import AllCustomerTakenTyresContext from "../../../../Contexts/Rebuild/AllCustomerTakenTyresContext";
import AllSendSupplierTyresContext from "../../../../Contexts/Rebuild/AllSendSupplierContext";
import { CustomerTakenTyre } from "../../../../services/Rebuild/tyre-taken-service";

interface Props {
  register: UseFormRegister<SendTyre>;
  control: Control<SendTyre>;
  sendTyreArrays?: SendSupplierTyre[];
}

const AddSendSupplierTyres = ({ register, control, sendTyreArrays }: Props) => {
  const [arrayLength, setArrayLength] = useState(0);
  const { append, remove, fields } = useFieldArray({
    name: "send_tyres",
    control,
  });

  const { customerTyresTaken } = useContext(AllCustomerTakenTyresContext);
  const { allSendSupplierTyres } = useContext(AllSendSupplierTyresContext);

  //Filtering supplier send tyres
  const [supplierSendTyres, setSupplierSendTyres] = useState<
    CustomerTakenTyre[]
  >([]);

  useEffect(() => {
    const filtered = customerTyresTaken.filter((cutomerTyre) => {
      const isAvailable = allSendSupplierTyres.some(
        (supplierTyre) =>
          cutomerTyre.rebuild_id === supplierTyre.customer_taken_tyre
      );
      return !isAvailable;
    });

    setSupplierSendTyres([...filtered]);
  }, [append]);

  //Fix Ui
  let countIndex = 0;
  useEffect(() => {
    countIndex++;

    if (countIndex === 1) {
      if (sendTyreArrays !== undefined) {
        append([...sendTyreArrays]);
        setArrayLength(sendTyreArrays.length);
      }
    }
  }, [append]);
  return (
    <Flex width="100%" flexDir="column">
      <Flex width="100%" flexDir="column">
        {fields.map((field, tyreIndex) => (
          <HStack width="100%" margin={3} key={field.id}>
            <Input
              {...register(`send_tyres.${tyreIndex}.job_no`)}
              placeholder="Job Number"
              type="text"
              isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
            />

            {/* Rebuild Id */}
            {arrayLength > tyreIndex ? (
              <Input
                {...register(`send_tyres.${tyreIndex}.customer_taken_tyre`)}
                placeholder="Rebuild Id"
                type="text"
                isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
              />
            ) : (
              <Select
                {...register(`send_tyres.${tyreIndex}.customer_taken_tyre`)}
              >
                <option>Rebuild Id</option>
                {supplierSendTyres.map((tyre) => (
                  <option value={tyre.rebuild_id}>{tyre.rebuild_id}</option>
                ))}
              </Select>
            )}

            {/* status */}
            {arrayLength > tyreIndex ? (
              <Input
                {...register(`send_tyres.${tyreIndex}.status`)}
                placeholder="Status"
                type="text"
                isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
              />
            ) : (
              <Select {...register(`send_tyres.${tyreIndex}.status`)}>
                <option value="">Select Status</option>
                <option value="send">Send</option>
              </Select>
            )}

            <Button
              bg="#f87454"
              padding={2.5}
              type="button"
              width="400px"
              onClick={() => remove(tyreIndex)}
            >
              Remove
            </Button>
          </HStack>
        ))}
        <Button
          type="button"
          onClick={() => append({} as SendSupplierTyre)}
          alignContent="top"
          width="50%"
          marginTop={5}
        >
          <Flex width="100%" justifyContent="space-between">
            <div className="me-4">Add Supplier Tyre</div>
            <IoAddCircle />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddSendSupplierTyres;
