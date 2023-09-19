import React, { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Bill, BillPayment } from "../../services/Billing/bill-page-service";
import PaymentCashInput from "./Payments/PaymentCashInput";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import PaymentChequeInput from "./Payments/PaymentChequeInput";
import PaymentCreditCardInput from "./Payments/PaymentCreditCardInput";
import billPaymentService from "../../services/Billing/bill-payment-service";
import PaymentCreditInput from "./Payments/PaymentCreditInput";
import BillPaymentContext from "../../Contexts/Bill/BillPaymentContext";
import AllBillContext from "../../Contexts/Bill/AllBillContext";

interface Props {
  createdBill: Bill;
}

const BillAddPayment = ({ createdBill }: Props) => {
  const [error, setError] = useState();
  const { toggleColorMode, colorMode } = useColorMode();
  const { billPayments, setBillPayments } = useContext(BillPaymentContext);
  const { bills } = useContext(AllBillContext);
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BillPayment>({
    defaultValues: {
      payment_cheques: [],
      payments_credit: [],
      payments_credit_card: [],
      payments_cash: [],
    },
  });

  const onPayment = (data: FieldValues) => {
    const newly = { ...data, bill_id: createdBill.invoice_id, discount:0 };
    console.log(newly);

    billPaymentService
      .create(newly)
      .then((res) => {
        setSuccess('Successfully do paments.')
        setBillPayments([...billPayments, res.data])
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Box marginTop={10}>
      {error && <Text textColor="red.600">{error}</Text>}
      {success && <Text textColor="green.600">{success}</Text>}
      <form onSubmit={handleSubmit(onPayment)}>
        <Flex>
          
        </Flex>
        {/* <Select margin={5} marginLeft={0} width="25vw">
          <option value="">Select Payment Method</option>
          <option value="0">Cash</option>
          <option value="1">Cheque</option>
          <option value="2">Credit Card</option>
          <option value="3">Credit</option>
        </Select> */}
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
