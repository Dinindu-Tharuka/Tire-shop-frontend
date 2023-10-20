import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { StockInvoice } from "../../../services/Stock/stock-invoice-page-service";
import { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import StockPaymentContext from "../../../Contexts/Stock/StockPaymentContext";
import { StockPayment } from "../../../services/Stock/stock-payment-service";

interface Props {
  selectedInvoices: StockInvoice[];
}

const DoMultiplePayments = ({ selectedInvoices }: Props) => {
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const { handleSubmit, register, control } = useForm<StockPayment>();
  const { stockPayments, setStockPayments } = useContext(StockPaymentContext);

  // selected Payment method
  const [value, setValue] = useState("1");

  const onSubmit = (data: StockPayment) => {};
  return (
    <Flex fontWeight="bold" flexDir="column">
      {paymentSuccess && <Text textColor="green.800">{paymentSuccess}</Text>}
      {paymentError && <Text textColor="red.700">{paymentError}</Text>}

      <HStack marginBottom={5} justifyContent="space-between">
        <Text>PAYMENTS</Text>
      </HStack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <>
            <Text>Select Payment Method</Text>

            <RadioGroup
              onChange={(value) => {
                setValue(value);
                setPaymentSuccess("");
                setPaymentError("");
              }}
              value={value}
              marginBottom={3}
            >
              <Stack direction="row">
                <Radio value="1">Cash</Radio>
                <Radio value="2">Cheque</Radio>
                <Radio value="3">Credit Card</Radio>
              </Stack>
            </RadioGroup>

            {value === "2" && (
              <>
                <HStack width="100%" whiteSpace="nowrap" alignItems="left">
                  <InputGroup>
                    <InputLeftAddon children="Check Date" />
                    <Input type="date" {...register(`cheque_date`)} />
                  </InputGroup>
                </HStack>
                <Input
                  type="text"
                  placeholder="Bank"
                  marginBottom={3}
                  {...register(`bank`)}
                />
                <Input
                  type="text"
                  placeholder="Branch"
                  marginBottom={3}
                  {...register(`branch`)}
                />
              </>
            )}
            <Input
              placeholder="Amount"
              marginBottom={5}
              {...register(`amount`)}
            />
          </>
        </VStack>

        <Button type="submit" bg="#f87454">
          Pay
        </Button>
      </form>
    </Flex>
  );
};

export default DoMultiplePayments;
