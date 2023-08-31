import { Input, Button, Flex, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Bill, PaymentCash, PaymentCheque, PaymentCredit } from "../../../services/Billing/bill-service";
import { IoAddCircle } from "react-icons/io5";

interface Props {
  register: UseFormRegister<Bill>;
  indexMain: number;
  control: Control<Bill>;
  field: FieldArrayWithId<Bill, "bill_payments">;
 
}

const PaymentCreditInput = ({register, indexMain, control, field}:Props) => {
    const { append, remove, fields } = useFieldArray({
        name: `bill_payments.${indexMain}.payments_credit`,
        control,
      });
  return (
    <>
      <Flex>
        <Flex>
          {fields.map((field, creditIndex) => (
            <VStack align='start'>
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit.${creditIndex}.bill_payment`
                )}
                placeholder="ID"
                type="number"
                defaultValue={creditIndex + 1}
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit.${creditIndex}.payeename`
                )}
                placeholder="Payee Name"
                type="text"
              />
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit.${creditIndex}.amount`
                )}
                placeholder="Amount"
                type="number"
              />              
              
              <label>Due Date</label>
              <Input
                {...register(
                  `bill_payments.${indexMain}.payments_credit.${creditIndex}.due_date`
                )}
                
                type='date'
              />
              {(
                <Button
                  bg="#f87454"
                  padding={2.5}
                  type="button"
                  onClick={() => remove(creditIndex)}
                >
                  Remove
                </Button>
              )}
            </VStack>
          ))}
          <Button
            type="button"
            onClick={() => append({} as PaymentCredit)}
            alignContent="top"
          >
            <div className="me-4">Add Credit Payment</div>
          <IoAddCircle />
          </Button>
        </Flex>
        
        
      </Flex>
    </>
  )
}

export default PaymentCreditInput