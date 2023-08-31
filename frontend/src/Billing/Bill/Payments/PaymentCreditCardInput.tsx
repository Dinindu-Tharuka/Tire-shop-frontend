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

const PaymentCreditCardInput = ({ register, indexMain, control, field}:Props) => {
  const { append, remove, fields } = useFieldArray({
    name: `bill_payments.${indexMain}.payments_credit_card`,
    control,
  });
  return (
    <>
      <Flex>
        <Flex>
          {fields.map((field, creditCardIndex) => (
            <VStack>
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit_card.${creditCardIndex}.bill_payment`
                )}
                placeholder="ID"
                type="number"
                defaultValue={creditCardIndex + 1}
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit_card.${creditCardIndex}.payeename`
                )}
                placeholder="Payee Name"
                type="text"
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit_card.${creditCardIndex}.amount`
                )}
                placeholder="Amount"
                type="number"
              />
              
                <Button
                  bg="#f87454"
                  padding={2.5}
                  type="button"
                  onClick={() => remove(creditCardIndex)}
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
            <div className="me-4">Add Credit Card Payment</div>
          <IoAddCircle />
          </Button>
        </Flex>
        
        
      </Flex>
    </>
  )
}

export default PaymentCreditCardInput