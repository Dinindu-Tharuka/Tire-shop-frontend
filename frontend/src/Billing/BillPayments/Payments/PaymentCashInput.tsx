import { Input, Button, Flex, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import {
  Bill,
  BillPayment,
  PaymentCash,
} from "../../../services/Billing/bill-page-service";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  register: UseFormRegister<BillPayment>;
  control: Control<BillPayment>;
}

const PaymentCashInput = ({ register, control }: Props) => {
  const { append, remove, fields } = useFieldArray({
    name: "payments_cash",
    control,
  });

  return (
    <Flex width="25vw">
      <Flex width="100%">
        {fields.map((field, cashIndex) => (
          <VStack width="100%">
            <Input
              {...register(`payments_cash.${cashIndex}.bill_payment`)}
              placeholder="Bill"
              type="number"
              defaultValue={cashIndex + 1}
            />
            <Input
              {...register(`payments_cash.${cashIndex}.payeename`)}
              placeholder="Payee Name"
              type="text"
            />
            <Input
              {...register(`payments_cash.${cashIndex}.amount`)}
              placeholder="Amount"
              type="number"
            />

            <Button
              bg="#f87454"
              padding={2.5}
              type="button"
              onClick={() => remove(cashIndex)}
            >
              Remove
            </Button>
          </VStack>
        ))}
        <Button
          type="button"
          onClick={() => append({} as PaymentCash)}
          alignContent="top"
          width="25vw"
          marginTop={5}
        >
          <Flex width='100%' justifyContent='space-between'>
            <div className="me-4">Add Cash Payment</div>
            <IoAddCircle />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default PaymentCashInput;
