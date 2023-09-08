import React, { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Bill, BillPayment } from "../../services/Billing/bill-service";
import PaymentCashInput from "./Payments/PaymentCashInput";
import { Box, Button, Input, useColorMode } from "@chakra-ui/react";
import PaymentChequeInput from "./Payments/PaymentChequeInput";
import PaymentCreditCardInput from "./Payments/PaymentCreditCardInput";
import billPaymentService from "../../services/Billing/bill-payment-service";
import PaymentCreditInput from "./Payments/PaymentCreditInput";

interface Props {
  createdBill: Bill;
}

const BillAddPayment = ({ createdBill }: Props) => {
  const [error, serError] = useState()
  const { toggleColorMode, colorMode } = useColorMode();
  

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BillPayment>();

  const onPayment = (data: FieldValues) => {
    const newly = { ...data, bill_id: createdBill.invoice_id};
    console.log(newly);

    billPaymentService
      .create(newly)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err.message));
  };

  return (
    <Box marginTop={10}>
      <form onSubmit={handleSubmit(onPayment)}>
        <Input
          {...register(`discount`)}
          placeholder="Discount"
          type="number"
          width="25vw"
        />
        <PaymentCashInput register={register} control={control} />
        <PaymentChequeInput register={register} control={control} />
        <PaymentCreditInput register={register} control={control} />
        <PaymentCreditCardInput register={register} control={control} />

        <Button
          bg={colorMode === "light" ? "#e3a99c" : "#575757"}
          type="submit"
          width="10vw"
        >
          Pay
        </Button>
      </form>
    </Box>
  );
};

export default BillAddPayment;
