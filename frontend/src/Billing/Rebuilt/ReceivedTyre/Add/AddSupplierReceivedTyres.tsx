import { Input, Button, Flex, HStack, Select, Text } from "@chakra-ui/react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { IoAddCircle } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import {
  ReceivedSupplierTyre,
  ReceivedTyre,
} from "../../../../services/Rebuild/Received/received-tyre-service";
import AllReceivedSupplierTyresContext from "../../../../Contexts/Rebuild/Received/AllReceivedSupplierTyre";
import AllSendSupplierTyresContext from "../../../../Contexts/Rebuild/AllSendSupplierContext";
import { SendSupplierTyre } from "../../../../services/Rebuild/send-tyre-service";

interface Props {
  register: UseFormRegister<ReceivedTyre>;
  control: Control<ReceivedTyre>;
  sendTyreArrays?: ReceivedSupplierTyre[];
}

const AddSupplierReceivedTyres = ({
  register,
  control,
  sendTyreArrays,
}: Props) => {
  const [arrayLength, setArrayLength] = useState(0);
  const { append, remove, fields } = useFieldArray({
    name: "received_tyres",
    control,
  });

  const { allSendSupplierTyres } = useContext(AllSendSupplierTyresContext);
  const { allReceivedSupplierTyres } = useContext(
    AllReceivedSupplierTyresContext
  );

  //Filtering supplier send tyres
  const [allFilteredSupplierTyres, setallFilteredSupplierTyres] = useState<
    SendSupplierTyre[]
  >([]);

  useEffect(() => {

    console.log('received suppliers', allReceivedSupplierTyres);
    
    const filtered = allSendSupplierTyres.filter((supplierTyre) => {
      console.log('suppier tyre', supplierTyre.job_no);
      
      const isAvailable = allReceivedSupplierTyres.some(
        (supplierReceivedTyre) =>
          parseInt(supplierReceivedTyre.send_supplier_tyre) === supplierTyre.id
      );
      return !isAvailable;
    });

    setallFilteredSupplierTyres([...filtered]);
  }, [append]);

  //Fix Ui
  let countIndex = 0;
  useEffect(() => {
    countIndex++;

    if (countIndex === 1) {
      if (sendTyreArrays !== undefined) {
        append([...sendTyreArrays.map(tyre => {
          const jobNo = allSendSupplierTyres.find(sendTyre => sendTyre.id === parseInt(tyre.send_supplier_tyre))?.job_no
          if (jobNo !== undefined){
          return {...tyre, send_supplier_tyre:jobNo }
        }



          return tyre
        } )]);
        console.log('array', sendTyreArrays)
        
        setArrayLength(sendTyreArrays.length);
      }
    }
  }, [append]);
  return (
    <Flex width="100%" flexDir="column">
      <Flex width="100%" flexDir="column">
        <Flex width="100%">
          <Text margin={3} width="25%">
            Cost
          </Text>
          <Text margin={3} width="25%">
            Job No
          </Text>
          <Text margin={3} width="25%">
            Status
          </Text>
        </Flex>
        {fields.map((field, tyreIndex) => (
          <HStack width="100%" margin={3} key={field.id}>
            <Input
              {...register(`received_tyres.${tyreIndex}.cost`)}
              placeholder="Cost"
              type="number"
              isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
            />

            {/* Job No */}
            {arrayLength > tyreIndex ? (
              <Input
                {...register(`received_tyres.${tyreIndex}.send_supplier_tyre`)}
                placeholder="Job No"
                type="text"
                isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
              />
            ) : (
              <Select
                {...register(`received_tyres.${tyreIndex}.send_supplier_tyre`)}
              >
                <option>Job No</option>
                {allFilteredSupplierTyres.map((tyre) => (
                  <option value={tyre.id}>{tyre.job_no}</option>
                ))}
              </Select>
            )}

            {/* status */}
            {arrayLength > tyreIndex ? (
              <Input
                {...register(`received_tyres.${tyreIndex}.status`)}
                placeholder="Status"
                type="text"
                isReadOnly={sendTyreArrays && arrayLength > tyreIndex}
              />
            ) : (
              <Select {...register(`received_tyres.${tyreIndex}.status`)}>
                <option value="">Select Status</option>
                <option value="received">Received</option>
                <option value="rejected">Rejected</option>
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
          onClick={() => append({} as ReceivedSupplierTyre)}
          alignContent="top"
          width="50%"
          marginTop={5}
        >
          <Flex width="100%" justifyContent="space-between">
            <div className="me-4">Add Received Tyre</div>
            <IoAddCircle />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddSupplierReceivedTyres;
