import { Input, Button, Flex, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Bill, PaymentCash } from "../../../services/Billing/bill-service";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  register: UseFormRegister<Bill>;
  indexMain: number;
  control: Control<Bill>;
  field: FieldArrayWithId<Bill, "bill_payments">;
 
}

const PaymentCashInput = ({
  register,
  indexMain,
  control,
  field,
 
}: Props) => {
  const { append, remove, fields } = useFieldArray({
    name: `bill_payments.${indexMain}.payments_cash`,
    control,
  });

  return (
    <>
      <Flex>
        <Flex>
          {fields.map((field, cashIndex) => (
            <VStack>
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_cash.${cashIndex}.bill_payment`
                )}
                placeholder="Bill"
                type="number"
                defaultValue={cashIndex + 1}
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_cash.${cashIndex}.payeename`
                )}
                placeholder="Payee Name"
                type="text"
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_cash.${cashIndex}.amount`
                )}
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
          >
            <div className="me-4">Add Cash Payment</div>
          <IoAddCircle />
          </Button>
        </Flex>
        
        
      </Flex>
    </>
  );
};

export default PaymentCashInput;
