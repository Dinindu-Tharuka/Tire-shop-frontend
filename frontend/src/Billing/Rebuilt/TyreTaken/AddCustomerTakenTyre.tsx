import { Input, Button, Flex, VStack, Text, HStack } from "@chakra-ui/react";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";

import { IoAddCircle } from "react-icons/io5";
import {
  CustomerTakenTyre,
  TyreTaken,
} from "../../../services/Rebuild/tyre-taken-service";
import { useEffect, useState } from "react";

interface Props {
  register: UseFormRegister<TyreTaken>;
  control: Control<TyreTaken>;
  customerArrays?: CustomerTakenTyre[];
}

const AddCustomerTakenTyre = ({ register, control, customerArrays }: Props) => {

  const { append, remove, fields } = useFieldArray({
    name: "customer_tyres",
    control,
  });

  let countIndex = 0;
  useEffect(() => {
    countIndex++;

    if (countIndex === 1) {
      if (customerArrays !== undefined) {
        append([...customerArrays]);
      }
    }
  }, [append]);

  console.log("fields", fields);

  return (
    <Flex width="100%">
      <Flex width="100%" flexDir="column">
        {fields.map((field, tyreIndex) => (
          <HStack width="100%" margin={3} key={field.id}>
            <Input
              {...register(`customer_tyres.${tyreIndex}.rebuild_id`)}
              placeholder="Rebuild Id"
              type="text"
            />
            <Input
              {...register(`customer_tyres.${tyreIndex}.tyre_no`)}
              placeholder="Tyre No"
              type="text"
            />
            <Input
              {...register(`customer_tyres.${tyreIndex}.size`)}
              placeholder="Size"
              type="text"
            />
            <Input
              {...register(`customer_tyres.${tyreIndex}.brand`)}
              placeholder="Brand"
              type="text"
            />

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
          onClick={() => append({} as CustomerTakenTyre)}
          alignContent="top"
          width="50%"
          marginTop={5}
        >
          <Flex width="100%" justifyContent="space-between">
            <div className="me-4">Add Customer Tyre</div>
            <IoAddCircle />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default AddCustomerTakenTyre;
