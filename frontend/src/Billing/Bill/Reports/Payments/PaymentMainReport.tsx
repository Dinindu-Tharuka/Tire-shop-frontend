import React, { useState } from "react";
import CashReport from "./Cash/CashReport";
import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { makeUpDate } from "../../../UI/MakeUpDate";
import ChequeReport from "./Cheque/ChequeReport";
import CreditCardReport from "./CreditCard/CreditCardReport";

const PaymentMainReport = () => {
  const [currentValue, setCurrentValue] = useState('1')
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return (
    <>
      <VStack>
        <RadioGroup defaultValue="1" >
          <Stack spacing={5} direction="row" >
            <Radio colorScheme="orange" value="1" onChange={(e)=> setCurrentValue(e.currentTarget.value)}>
              Cash
            </Radio>
            <Radio colorScheme="orange" value="2" onChange={(e)=> setCurrentValue(e.currentTarget.value)}>
              Cheque
            </Radio>
            <Radio colorScheme="orange" value="3" onChange={(e)=> setCurrentValue(e.currentTarget.value)}>
              Credit Card
            </Radio>
          </Stack>
        </RadioGroup>
        <HStack width="58vw">
          <InputGroup>
            <InputLeftAddon children="Start" />
            <Input
              type="date"
              width="20vw"
              onChange={(e) => setStartDate(e.currentTarget.value)}
              defaultValue={currentDate}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="End" />
            <Input
              type="date"
              width="20vw"
              onChange={(e) => setEndDate(e.currentTarget.value)}
            />
          </InputGroup>
        </HStack>
        {currentValue === '1' && <CashReport startDate={startDate} endDate={endDate} />}
        {currentValue === '2' && <ChequeReport startDate={startDate} endDate={endDate}/>}
        {currentValue === '3' && <CreditCardReport startDate={startDate} endDate={endDate} />}
      </VStack>
    </>
  );
};

export default PaymentMainReport;
