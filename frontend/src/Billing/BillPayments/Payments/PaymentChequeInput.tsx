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
  PaymentCheque,
} from "../../../services/Billing/bill-page-service";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  register: UseFormRegister<BillPayment>;
  control: Control<BillPayment>;
}

const PaymentChequeInput = ({ register, control }: Props) => {
  const { append, remove, fields } = useFieldArray({
    name: `payment_cheques`,
    control,
  });
  return (
    <>
      <Flex>
        <Flex>
          {fields.map((field, chequeIndex) => (
            <VStack align="start">
              <Input
                {...register(`payment_cheques.${chequeIndex}.bill_payment_id`)}
                placeholder="Bill"
                type="number"
                defaultValue={chequeIndex + 1}
              />
              <Input
                {...register(`payment_cheques.${chequeIndex}.payeename`)}
                placeholder="Payee Name"
                type="text"
              />
              <Input
                {...register(`payment_cheques.${chequeIndex}.amount`)}
                placeholder="Amount"
                type="number"
              />
              <Input
                {...register(`payment_cheques.${chequeIndex}.cheque_no`)}
                placeholder="Cheque No"
                type="text"
              />
              <Input
                {...register(`payment_cheques.${chequeIndex}.bank`)}
                placeholder="Bank"
                type="text"
              />
              <Input
                {...register(`payment_cheques.${chequeIndex}.branch`)}
                placeholder="Branch"
                type="text"
              />
              <label>Cheque Date</label>
              <Input
                {...register(`payment_cheques.${chequeIndex}.cheque_date`)}
                placeholder="Cheque Date"
                type="date"
              />

              <Button
                bg="#f87454"
                padding={2.5}
                type="button"
                onClick={() => remove(chequeIndex)}
              >
                Remove
              </Button>
            </VStack>
          ))}
          <Button
            type="button"
            onClick={() => append({} as PaymentCheque)}
            alignContent="top"
            width="25vw"
            margin={5}
            marginLeft={0}
          >
            <Flex width="100%" justifyContent="space-between">
              <div className="me-4">Add Cheque Payment</div>
              <IoAddCircle />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default PaymentChequeInput;
