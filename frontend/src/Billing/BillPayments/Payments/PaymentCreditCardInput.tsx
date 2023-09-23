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

const PaymentCreditCardInput = ({ register, control }: Props) => {
  const { append, remove, fields } = useFieldArray({
    name: `payments_credit_card`,
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
                  `payments_credit_card.${creditCardIndex}.bill_payment`
                )}
                placeholder="ID"
                type="number"
                defaultValue={creditCardIndex + 1}
              />
              <Input
                {...register(
                  `payments_credit_card.${creditCardIndex}.payeename`
                )}
                placeholder="Payee Name"
                type="text"
              />
              <Input
                {...register(`payments_credit_card.${creditCardIndex}.amount`)}
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
            justifyContent='space-between'
            type="button"
            onClick={() => append({} as PaymentCash)}
            alignContent="top"
            width='25vw'
            // margin={5}
            marginBottom={5}
            marginLeft={0}
          >
            <Flex width='100%' justifyContent='space-between'>
              <div className="me-4">Add Credit Card Payment</div>
              <IoAddCircle />

            </Flex>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default PaymentCreditCardInput;
