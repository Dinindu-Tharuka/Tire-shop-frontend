import React, { useContext, useState } from "react";
import stockPaymentService, {
  StockPayment,
} from "../../../services/Stock/stock-payment-service";
import { StockInvoice } from "../../../services/Stock/stock-invoice-page-service";
import { useForm } from "react-hook-form";
import StockPaymentContext from "../../../Contexts/Stock/StockPaymentContext";
import {
  Flex,
  Text,
  Select,
  Button,
  Input,
  RadioGroup,
  Stack,
  Radio,
  VStack,
} from "@chakra-ui/react";

interface Props {
  seletedStockInvoice: StockInvoice;
}

const StockInvoicePayments = ({ seletedStockInvoice }: Props) => {
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const { handleSubmit, register } = useForm<StockPayment>();
  const { stockPayments, setStockPayments } = useContext(StockPaymentContext);

  // selected Payment method
  const [value, setValue] = useState("1");

  const onSubmit = (data: StockPayment) => {
    const newly = { ...data, stock_invoice: seletedStockInvoice.invoice_no };
    console.log("payments", newly);

    stockPaymentService
      .create(newly)
      .then((res) => {
        setStockPayments([...stockPayments, res.data]);
        setPaymentSuccess("Payment Succesfull.");
      })
      .catch((err) => setPaymentError(err.message));
  };
  return (
    <Flex fontWeight="bold" flexDir="column">
      {paymentSuccess && <Text textColor="green.800">{paymentSuccess}</Text>}
      {paymentError && <Text textColor="red.700">{paymentError}</Text>}
      <Text marginBottom={5}>PAYMENTS</Text>
      <Text>Select Payment Method</Text>

      <RadioGroup onChange={setValue} value={value} marginBottom={3}>
        <Stack direction="row">
          <Radio value="1">Cash</Radio>
          <Radio value="2">Cheque</Radio>
          <Radio value="3">Credit Card</Radio>
        </Stack>
      </RadioGroup>
      <form onSubmit={handleSubmit(onSubmit)}>
        {value === "2" && <>
          <VStack alignItems='left' marginBottom={3}>
          <Text fontWeight='normal' marginBottom={0}>Check Date</Text>
          <Input type="date"/>
        </VStack>
        <Input type="text" placeholder="Bank" marginBottom={3}/>
        <Input type="text" placeholder="Branch" marginBottom={3}/>
        </>
        }
        <Input placeholder="Amount" marginBottom={5} {...register("amount")} />

        <Button type="submit" bg="#f87454">
          Pay
        </Button>
      </form>
    </Flex>
  );
};

export default StockInvoicePayments;
